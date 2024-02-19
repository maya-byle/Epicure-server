import express from "express";
import { connectToDb } from "./db";
import apiRoutes from "./routes/api/api.route";
import swaggerRoutes from "./utils/swagger";

const app: express.Application = express();

app.use(express.json());
app.use("/api", apiRoutes);
app.use("/api-docs", swaggerRoutes);

function srartServer(): void {
  connectToDb();
  app.listen(process.env.PORT || 3000, () => {
    console.log("app listening at port " + (process.env.PORT || 3000));
  });
}

srartServer();
