import {Schema, model, models} from "mongoose";

const SensorReadingSchema = new Schema(
    {
        temp: {
            type: Number,
            require: true
        },
        pH: {
            type: Number,
            require: true
        },
        dox: {
            type: Number,
            require: true
        },
        date: {
            type: String
        },
        time: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const SensorReading = models.SensorReading || model("SensorReading", SensorReadingSchema)

export default SensorReading;