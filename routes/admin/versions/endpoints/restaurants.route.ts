import restaurantController from "../../../../controllers/restaurant.controller";
import verifyToken from "../../../../middleware/middleware";
import express from "express";

const router: express.Router = express.Router();

router.use(verifyToken);

router.get("/", restaurantController.getAllRestaurants);
router.get("/chefslist", restaurantController.getChefs);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
