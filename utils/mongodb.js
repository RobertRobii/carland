import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};
