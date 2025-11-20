import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log("database connected successfully")
    } catch (error) {
        console.log("there is an error connecting the database")
        process.exit(1)
    }
}