import connect from '@/app/db/db'
import SensorReading from '@/app/db/models/sensor-reading';
import { NextResponse } from "next/server"


export const POST = async (request, {test}) => {
    try{
        console.log( test)
        // mongodb 
        // blocked by mirdc network
        await connect();
        
        const total = await SensorReading.countDocuments()
        const sensorReading = await SensorReading.find().skip(0).sort({ createdAt: -1 }).limit(20)
        return new NextResponse(JSON.stringify({message: 'fetch data successfully!',data: sensorReading, total:total }), {status: 200});
    } catch (error) {
        return new NextResponse("Error in fetching Sensor Readings, " + error.message, {status: 500});
    }
}