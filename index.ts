import express from "express";
import { connectToDb } from "./db";
import dishesRoutes from "./routes/dishes";
import chefsRoutes from "./routes/chefs";
import restaurantsRoutes from "./routes/restaurants";

const app = express();

connectToDb((err: any) => {
  if (err) {
    return;
  }
  app.use("/", dishesRoutes);
  app.use("/", chefsRoutes);
  app.use("/", restaurantsRoutes);
  startServer();
});

function startServer() {
  app.listen(process.env.PORT || 3000, () => {
    console.log("app listening at port " + (process.env.PORT || 3000));
  });
}
