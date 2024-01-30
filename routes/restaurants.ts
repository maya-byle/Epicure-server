import express from "express";
import { getConnection } from "../db";
import { Connection } from "mongoose";
import Dish from "../models/dishModel";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const db = await getConnection(); //TODO: move it to db and just move the connection to here
    const restaurants = await db.collection("Restaurants").find({}).toArray();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

router.get("/chefs", (req, res) => {
  res.send("Hello World, This is chefs router");
});

export default router;
