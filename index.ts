import express from "express";
import cors from "cors";
import { connectToDb } from "./db";
import apiRoutes from "./routes/api/api.route";
import swaggerRoutes from "./utils/swagger";

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes);
app.use("/api-docs", swaggerRoutes);

function startServer(): void {
  connectToDb();
  app.listen(process.env.PORT || 3001, () => {
    console.log("app listening at port " + (process.env.PORT || 3001));
  });
}

startServer();
