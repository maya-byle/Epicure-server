import express from "express";
import cors from "cors";
import connectToDb from "./db";
import apiRoutes from "./routes/api/api.route";
import swaggerRoutes from "./utils/swagger";
import adminRoutes from "./routes/admin/admin.route";

const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://51.20.60.47", "http://51.20.121.200"],
  })
);
// app.use(cors());
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);
app.use("/api-docs", swaggerRoutes);

function startServer(): void {
  connectToDb();
  app.listen(process.env.PORT || 3001, () => {
    console.log("app listening at port " + (process.env.PORT || 3001));
  });
}

startServer();
