import mongoose from "mongoose";

let isConnected = false;
const MONGODB_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    if (MONGODB_URI === undefined) {
      throw new Error("MONGO URI is undifined");
    }
    await mongoose.connect(MONGODB_URI);

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
