import mongoose from "mongoose";

let isConnected = false;
const connectionString = process.env.MONGO_URI;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    if (connectionString === undefined) {
      throw new Error("MONGO URI is undifined");
    }
    await mongoose.connect(connectionString);

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
