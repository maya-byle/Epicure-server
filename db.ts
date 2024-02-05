import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri: string = process.env.DEPLOYED_MONGODB_URI || "";

let dbConnection: Connection;

export const connectToDb = async () => {
  try {
    await mongoose.connect(uri, {});
    mongoose.set("strictPopulate", false);
    dbConnection = mongoose.connection;
    console.log("Connected to db");
  } catch (err) {
    console.error(err, "Error while connecting to DB");
  }
};
