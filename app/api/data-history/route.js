import connect from '@/app/db/db'
import SensorReading from '@/app/db/models/sensor-reading';
import { NextResponse } from "next/server"


export const POST = async (request) => {
    try{
        
        const body = await request.json();

        console.log('body', body)
        
        const limit = body?.limit
        const skip = body?.skip


        // mongodb 
        // blocked by mirdc network
        await connect();
        
        
        const total = await SensorReading.countDocuments()
        const sensorReading = await SensorReading.find().skip(skip).sort({ date: -1, createdAt: -1 }).limit(limit)
        return new NextResponse(JSON.stringify({message: 'fetch data successfully!',data: sensorReading, total:total }), {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching Sensor Readings, " + error.message, {status: 500});
    }
}