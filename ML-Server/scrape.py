from matplotlib.pyplot import title
import requests
from bs4 import BeautifulSoup
import csv

cities=['dubai','new-york','paris','singapore','london','rome','venice','barcelona','budapest','prague','milan']


f = open('data.csv', 'w', encoding='UTF8',newline='')
writer = csv.writer(f)
header = ['city', 'review']
writer.writerow(header)

for city in cities:
    url='https://www.headout.com/blog/'+city+'-travel-guide/'
    req = requests.get(url)
    soup = BeautifulSoup(req.content, 'html.parser')
    eles = soup.find_all("div", class_="thrv_wrapper thrv_custom_html_shortcode")
    print(city)
    print(len(eles))
    for ele in eles:
        try:
            p = []
            t = ele.find("h2", class_="add-to-summary")
            p.extend(ele.find_all("p"))
            div = ele.find_all("div")

            for di in div:
                try:
                    p.extend(di.find("p", class_="read-more-wrap"))
                except Exception as e:
                    #print("1   " + str(e))
                    pass
                try:
                    p.extend(di.find("p", class_="read-more-target"))
                except Exception as e:
                    #print("2  " + str(e))
                    pass
            value=t.text+"\n"
            for pi in p:
                try:
                    value += ""+str(pi.text)
                except :
                    pass
            key=city
            body=[key,value]
            writer.writerow(body)
        except Exception as e:
            #print(e)
            pass

# print(soup.prettify())
