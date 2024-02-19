import dishController from "../../../../controllers/dish.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/", dishController.getAllDishes);
router.post("/", dishController.createDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

export default router;
