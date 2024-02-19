import { Router } from "express";
import v1Router from "./versions/v1.route";

const ApiRouter = Router();

ApiRouter.use("/v1", v1Router);

export default ApiRouter;
