import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URL =", process.env.MONGO_URL);

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is undefined. Check your .env file location.");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection FAILED ❌");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
