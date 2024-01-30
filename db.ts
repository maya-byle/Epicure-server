import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const localUri: string = process.env.LOCAL_MONGODB_URI || "";

let dbConnection: Connection;

export const connectToDb = async (cb: (err?: any) => void) => {
  try {
    await mongoose.connect(localUri, {});
    dbConnection = mongoose.connection;
    console.log("Connected to db");
    cb();
  } catch (err) {
    console.error(err, "Error while connecting to DB");
    cb(err);
  }
};
