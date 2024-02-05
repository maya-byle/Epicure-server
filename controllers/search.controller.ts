import searchHandler from "../handlers/search.handler";
import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
  try {
    const searchInput: string = req.body.input;
    const results = await searchHandler.get(searchInput);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
};

export default {
  get,
};
