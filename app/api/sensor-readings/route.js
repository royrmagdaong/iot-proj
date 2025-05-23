import connect from '@/app/db/db'
import SensorReading from '@/app/db/models/sensor-reading';
import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import axios from 'axios'



export async function GET() {
    try{
        // mongodb 
        // blocked by mirdc network
        await connect();
        const sensorReading = await SensorReading.find().sort({ date: -1, createdAt: -1}).limit(1)
        return new NextResponse(JSON.stringify({message: 'fetch data successfully!',data: sensorReading }), {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching Sensor Readings, " + error.message, {status: 500});
    }
}

export const POST = async (request) => {
    
    try{
        const body = await request.json();
        // console.log(await request.json())

        const temp = body?.data.temp
        const pH = body?.data.pH
        const dox = body?.data.dox
        const date = body?.data.date
        const time = body?.data.time

        console.log('body', body)
        
        await connect();
        const newReadings = new SensorReading({
            temp: temp,
            pH: pH,
            dox: dox,
            date: date,
            time: time
        });
        await newReadings.save()

        return new NextResponse(JSON.stringify({message: 'fetch data successfully!',data: newReadings }), {status: 200});
        
    }catch (error) {
        return new NextResponse("Error in inserting sensor readings " + error.message, {status: 500});
    }
}