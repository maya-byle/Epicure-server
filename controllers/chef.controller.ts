import chefHandler from "../handlers/chef.handler";
import { Request, Response } from "express";

const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await chefHandler.getAllChefs();
    res.status(200).json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

const createChef = async (req: Request, res: Response) => {
  try {
    const newChef = await chefHandler.createChef(req.body);
    res
      .status(200)
      .json({ message: "Chef created successfully", chef: newChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the chef" });
  }
};

const updateChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const updatedChef = await chefHandler.updateChef(chefId, req.body);
    res
      .status(200)
      .json({ message: "Chef updated successfully", chef: updatedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the chef" });
  }
};

const deleteChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const deletedChef = await chefHandler.deleteChef(chefId);
    if (!deletedChef) return res.status(404).json({ error: "Chef not found" });
    res
      .status(200)
      .json({ message: "Chef deleted successfully", chef: deletedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the chef" });
  }
};

export default {
  getAllChefs,
  createChef,
  updateChef,
  deleteChef,
};
