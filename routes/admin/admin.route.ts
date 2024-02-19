import { Router } from "express";
import v1Router from "./versions/v1.route";

const adminRouter = Router();

adminRouter.use("/v1", v1Router);

export default adminRouter;
