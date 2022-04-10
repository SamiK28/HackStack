from pyexpat import model
import warnings
from geotext import GeoText
import nltk
from textblob import TextBlob
from transformers import pipeline
import joblib
import pandas as pd
import os
from tqdm import tqdm
from fuzzywuzzy import fuzz
import flask
from flask import jsonify,request
from flask_cors import CORS
app = flask.Flask(__name__)
cors = CORS(app)

tqdm.pandas()

nltk.download('brown')
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

warnings.simplefilter("ignore")

from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
lem = WordNetLemmatizer()

class ML_Query():
    def __init__(self):
        self.category_tags = ["adventure","fashion","food","monument","nature","weather"]
        if os.path.isdir("models") == False:
            os.mkdir("models")
        if os.path.isfile('models/summarizer.joblib') == False:
            # print("Loading model")
            self.zero_shot = pipeline("zero-shot-classification",model="facebook/bart-large-mnli")
            self.nlp_qa = pipeline('question-answering')
            self.summarizer = pipeline('summarization')
            
            # self.nlp_qa = pipeline('question-answering',model="facebook/bart-large-mnli-qa")
            # self.summarizer = pipeline('summarization',model="csebuetnlp/mT5_multilingual_XLSum")
                
            # print("Creation completed")
            joblib.dump(self.summarizer,"models/summarizer.joblib")
            joblib.dump(self.nlp_qa,"models/question_answering.joblib")
            joblib.dump(self.zero_shot,"models/zero_shot.joblib")
            # print("Loading completed")
        
        self.summarizer = joblib.load("models/summarizer.joblib")        
        self.nlp_qa = joblib.load("models/question_answering.joblib")        
        self.zero_shot = joblib.load("models/zero_shot.joblib") 
        
        if os.path.isfile("models/final.csv") == False:
            self.load_complete_data("data.csv")
        else:
            self.final_data = pd.read_csv("models/final.csv")
            
    def load_complete_data(self,path):
        self.final_data = pd.DataFrame()
        self.load_latest_data(path)
        self.final_data.to_csv("models/final.csv",index=False)
    
    def get_summary(self,text):
        return self.summarizer(text)[0]["summary_text"]

    def get_keywords(self,text):
        return str(list(TextBlob(text).noun_phrases))

    def get_tags(self,text,thres = 0.3):
        result = self.zero_shot(text, self.category_tags, multi_label=True)
        result = dict(zip(result["labels"],result["scores"]))
        for i,j in result.items():
            if j>thres:
                result[i] = 1
            else:
                result[i] = 0
        return result

    def apply_changes(self,row):
        try:
            text = dict(row)["review"]
            row["keywords"] = self.get_keywords(text)
            row["summary"]  = self.get_summary(text)
            result = self.get_tags(text)
            for i,j in result.items():
                row[i] = j
        except:
            pass
        return row

    def load_latest_data(self,path):
        df = pd.read_csv("data.csv")
        df = df.progress_apply(self.apply_changes,axis=1)
        self.final_data = self.final_data.append(df)

    def get_all_data(self,city_name):
        return self.final_data.loc[self.final_data.city == city_name]
    
    def question_answering(self,row,question):
        content = dict(row)["review"]
        result = self.nlp_qa(context=content, question=question)
        row["summary"] = result["answer"]
        row["score"]  = result["score"]
        return row

    def get_best_answer(self,data,query):
        temp = data.copy()
        temp = temp.apply(lambda x:self.question_answering(row = x,question=query),axis=1)
        temp.sort_values("score",inplace=True,ascending = False)
        temp.reset_index(drop=True,inplace=True)
        temp.drop(columns = ["score"],inplace=True)
        return temp.head(min(3,len(temp))).reset_index(drop=True)
    
    def get_city_name(self,query):
        try:
            places = GeoText(query)
            return places.cities[0].lower()
        except:
            return -1
            
    def get_fuzzy_match(self,data,query,thresh = 0.5):
        temp = data.copy()
        query_keywords = self.get_keywords(query)
        temp["fuzzy"] = temp["keywords"].apply(lambda x: fuzz.partial_ratio(x, query_keywords))
        temp = temp[temp.fuzzy>thresh]
        temp.drop(columns = ["fuzzy"],inplace=True)
        return temp.reset_index(drop=True)

    def resolve_query(self,query):
        if query.lower() in self.final_data.city.unique():
            return self.get_all_data(query.lower())
        else:
            city = self.get_city_name(query)
            if city == -1:
                raise Exception
            else:
                tags = self.get_tags(query)
                temp = self.final_data[self.final_data.city == city]
                temp_temp = pd.DataFrame()
                for feature,val in tags.items():
                    if val == 1:
                        temp_temp = temp_temp.append(temp.loc[temp[feature] == val])
                temp_temp.drop_duplicates(inplace=True)
                temp = temp_temp.reset_index(drop=True)
                temp = self.get_fuzzy_match(temp,query)
                answer = self.get_best_answer(temp,query)
            return answer


obj = ML_Query()
 
@app.route('/', methods=['GET'])
def hello():
    return 'Hello World!'

@app.route('/query',methods=['POST','GET'])
def resolution():
    content = request.json
    query = content['query']
    try:
        answer = obj.resolve_query(query)
    except Exception as e:
        print(e)
        answer= obj.final_data.sample(3)
    output = answer.T.to_json()
    # response = flask.Response()
    # response.headers['Content-Type'] = 'application/json'
    # response.set_data(output)
    return output,200,{'Content-Type': 'application/json'}
  
# main driver function
if __name__ == '__main__':
      app.run(debug=True,use_reloader=False)