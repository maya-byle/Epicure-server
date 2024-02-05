import { Router } from "express";
import dishesRoutes from "./endpoints/dishes.route";
import chefsRoutes from "./endpoints/chefs.route";
import restaurantsRoutes from "./endpoints/restaurants.route";
import searchRoutes from "./endpoints/search.route";

const router = Router();

router.use("/dishes", dishesRoutes);
router.use("/chefs", chefsRoutes);
router.use("/restaurants", restaurantsRoutes);
router.use("/search", searchRoutes);

export default router;
