import mongoose from "mongoose";



export default function connectDB()
{
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://ashatokhi2:NeZloB_007@cluster0.rktsv1o.mongodb.net/").then(() => {
    console.log('Connected to MongoDB.');});
}