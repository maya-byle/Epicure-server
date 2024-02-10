import chefController from "../../../../controllers/chef.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/", chefController.getAllChefs);
router.post("/", chefController.createChef);
router.put("/:id", chefController.updateChef);
router.delete("/:id", chefController.deleteChef);

export default router;
