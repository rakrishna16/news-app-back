import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected :)");
  } catch (error) {
    console.log(error);
  }
};

export default dbConfig;
