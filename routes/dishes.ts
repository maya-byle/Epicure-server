import dishController from "../controllers/dish.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/dishes", dishController.getAllDishes);
router.post("/dishes", dishController.createDish);
router.put("/dishes/:id", dishController.updateDish);
router.delete("/dishes/:id", dishController.deleteDish);

export default router;
