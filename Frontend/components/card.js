import React, { useState } from 'react';
import { getNumber } from '../pages/result/[name]/rand_int'
export default function Card(props) {
    
    const arr=props.ar;

    function pascalCase(w) {
        const ar2 = w? w.split("-"):[];
        if (ar2.length === 1) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
        }

        var res = []
        for (let i = 0; i < ar2.length; i++) {
            res.push(ar2[i][0].toUpperCase() + ar2[i].slice(1).toLowerCase());
        }
        return res.join(" ");
    }

    
    
    const [rmi, setRmi] = useState(false);
    const toggleRead = () => {
        setRmi(!rmi);
    }
    const a = getNumber(arr.city)
    console.log(arr.city);
    const t =
            '/images/' +
            arr.city +
            '/' +
            arr.city +
            '(' +
            String(a) +
            ')' +
            '.jpg'
    return (
        <div className="max-w-sm relative rounded shadow-lg h-160 bg-white mb-6 md:w-120 cursor-pointer md:hover:scale-105 hover:z-4">
            <img className="w-120 h-80" src={t} alt={arr.city} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 grid justify-items-center">{pascalCase(arr.city)}</div>
                <p className="text-gray-700 text-base">
                    {arr.text}
                </p>
                <div className={rmi ? "py-6 h-auto" : "hidden"}><p className="font-semibold text-base py-1">Summary</p>{arr.summary}</div>
                <div className="grid justify-items-end text-base px-6 py-4"><div className="text-[#FD507E] absolute bottom-4 right-8 hover:underline underline-offset-2" onClick={toggleRead}>Read {rmi ? "Less" : "More"}</div></div>
            </div>
        </div>)
}