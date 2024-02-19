import restaurantController from "../../../../controllers/restaurant.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/", restaurantController.getAllRestaurants);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
