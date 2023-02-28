import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;
export const mongoConnect = async () => {
    console.log("mongoDb Connected");
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri);
    }
    catch (error) {
        console.log(error);
    }
};
