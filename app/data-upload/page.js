
'use client'
import * as React from 'react';
import { useState, useEffect } from "react";
import { read, utils } from 'xlsx';


export default function Home() {
    const [pres, setPres] = useState([]);

    useEffect( ()=>{
        const readXC = async () => {
             /* Download from https://docs.sheetjs.com/pres.numbers */
            const f = await fetch("./data1.xlsx");
            const ab = await f.arrayBuffer();

            /* parse */
            const wb = read(ab);

            /* generate array of objects from first worksheet */
            const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
            const data = utils.sheet_to_json(ws); // generate objects

            /* update state */
            setPres(data); // update state
            console.log('data', data)
            
        }

         readXC()
         
    },[])

   


    return (
        <div className='p-4 mb-14'>
            
        </div>
    )
}
