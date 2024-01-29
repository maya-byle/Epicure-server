import express from "express";
import { getConnection } from "../db";
import { Connection } from "mongoose";
import Dish from "../models/dishModel";

// const db: Connection = getConnection();
const router = express.Router();

router.get("/dishes", async (req, res) => {
  try {
    const db = await getConnection(); //TODO: move it to db and just move the connection to here
    console.log("list of collections:", await db.listCollections());
    const dishes = await db.collection("Dishes").find({}).toArray();
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

router.get("/resturants", (req, res) => {
  res.send("Hello World, This is resturants router");
});

router.get("/chefs", (req, res) => {
  res.send("Hello World, This is chefs router");
});

export default router;
