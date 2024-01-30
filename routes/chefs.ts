import express from "express";
import chefModel from "../models/chef.model";

const router = express.Router();

router.get("/chefs", async (req, res) => {
  try {
    const chefs: any = await chefModel.find();
    res.status(200).json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

router.post("/chefs", async (req, res) => {
  try {
    const newChef = await chefModel.create(req.body);
    res
      .status(200)
      .json({ message: "Chef created successfully", chef: newChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the chef" });
  }
});

router.put("/chefs/:id", async (req, res) => {
  try {
    const chefId = req.params.id;
    const updatedChef = await chefModel.updateOne({ _id: chefId }, req.body);
    res
      .status(200)
      .json({ message: "Chef updated successfully", chef: updatedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the chef" });
  }
});

router.delete("/chefs/:id", async (req, res) => {
  try {
    const chefId = req.params.id;
    const deletedChef = await chefModel.findByIdAndDelete(chefId);
    if (!deletedChef) return res.status(404).json({ error: "Chef not found" });
    res
      .status(200)
      .json({ message: "Chef deleted successfully", chef: deletedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the chef" });
  }
});

export default router;
