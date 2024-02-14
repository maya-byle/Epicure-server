import chefController from "../../../../controllers/chef.controller";
import verifyToken from "../../../../middleware/middleware";
import express from "express";

const router: express.Router = express.Router();

router.use(verifyToken);

router.get("/", chefController.getAllChefs);
router.post("/", chefController.createChef);
router.put("/:id", chefController.updateChef);
router.delete("/:id", chefController.deleteChef);

export default router;
