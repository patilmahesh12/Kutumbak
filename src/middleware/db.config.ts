import Family from "@/models/Family";
import User from "@/models/User";
import mongoose from "mongoose";

// Database Connection

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to the Database");
    });
    connection.on("error", (error) => {
      console.log("Error: ", error);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
  Family;
  User;
};

export default dbConfig;
