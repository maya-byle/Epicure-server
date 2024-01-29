// const password = "UkNLSllxeF1o";
// const deployeduri = `mongodb+srv://Cluster47742:${password}@cluster47742.cv0bgdv.mongodb.net/?retryWrites=true&w=majority`;
import mongoose, { Connection, Document, Schema } from "mongoose";

const localUri = "mongodb://localhost:27017/Epicure";
// const localUri = "mongodb://localhost/epicure";

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

export const getConnection = (): Connection => {
  return dbConnection;
};
