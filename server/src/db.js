import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()



export default function connectDB()
{
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECT).then(() => {
    console.log('Connected to MongoDB.');});
}