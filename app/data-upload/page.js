
'use client'
import * as React from 'react';
import { useState, useEffect } from "react";
import { read, utils } from 'xlsx';
import axios from 'axios'


export default function Home() {
    const [pres, setPres] = useState([]);

    useEffect( ()=>{
        const readXC = async () => {
             /* Download from https://docs.sheetjs.com/pres.numbers */
            const f = await fetch("./data2.xlsx");
            const ab = await f.arrayBuffer();

            /* parse */
            const wb = read(ab);

            /* generate array of objects from first worksheet */
            const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
            const data = utils.sheet_to_json(ws); // generate objects

            /* update state */
            setPres(data); // update state


            let formattedData = [];
            let formattedDataInArray = [];


            data.forEach(i=>{
                formattedData.push(i?.data)
            })

            

            formattedData.forEach(ii => {
                const dataArr = ii.split(',').filter(item => item);
                const dataObject = {};
                
                let counter = 0
                dataArr.forEach(item => {
                    const [key, value] = item.split(':');
                    dataObject[key] = value;

                    if(counter==1){
                        const timeVal = item.slice(5)
                        dataObject["time"] = timeVal
                    }
                    counter++
                });
                formattedDataInArray.push(dataObject)
                
            })
           

            formattedDataInArray.reverse()
            // console.log('reverse', formattedDataInArray)

            function myLoop(i) {
                setTimeout(function() {
                    // console.log('hello'); //  your code here   
                    
                    const data = {
                        temp: formattedDataInArray[i-1]?.TEMP,
                        pH: formattedDataInArray[i-1]?.PH,
                        dox: formattedDataInArray[i-1]?.DO,
                        date: formattedDataInArray[i-1]?.date,
                        time: formattedDataInArray[i-1]?.time
                    }

                    console.log(`data ${i-1}`, data)

                    axios.post('http://localhost:3000/api/data-upload', {data})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


                    if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
                }, 500)
            };  //  pass the number of iterations as an argument
            myLoop(formattedDataInArray.length)
        }

        readXC()

    },[])

   


    return (
        <div className='p-4 mb-14'>
            
        </div>
    )
}
