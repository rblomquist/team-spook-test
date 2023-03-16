import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri: string = process.env.MONGO_URI as string;

export const mongoConnect = async() => {
  console.log("mongoDb Connected")
  try{
  mongoose.set('strictQuery', false);
    await mongoose.connect(uri)
  }catch(error){
    console.log(error)
  }
};


