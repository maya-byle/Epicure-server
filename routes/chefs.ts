import express from "express";
import { getConnection } from "../db";
import { Connection } from "mongoose";
import Dish from "../models/dishModel";

const router = express.Router();

router.get("/chefs", async (req, res) => {
  try {
    const db = await getConnection(); //TODO: move it to db and just move the connection to here
    const chefs = await db.collection("Chefs").find({}).toArray();
    res.status(200).json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

export default router;
