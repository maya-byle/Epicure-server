import searchController from "../../../../controllers/search.controller";
import express from "express";

const router: express.Router = express.Router();

router.get("/", searchController.searchAll);

export default router;
