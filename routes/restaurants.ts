import restaurantController from "../controllers/restaurant.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/restaurants", restaurantController.getAllRestaurants);
router.post("/restaurants", restaurantController.createRestaurant);
router.put("/restaurants/:id", restaurantController.updateRestaurant);
router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

export default router;
