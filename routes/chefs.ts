import chefController from "../controllers/chef.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/chefs", chefController.getAllChefs);
router.post("/chefs", chefController.createChef);
router.put("/chefs/:id", chefController.updateChef);
router.delete("/chefs/:id", chefController.deleteChef);

export default router;
