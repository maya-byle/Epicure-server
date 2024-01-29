import mongoose, { Document } from "mongoose";

interface DishType extends Document {
  image: string;
  title: string;
  subTitle: string;
  foodIcon?: "spicy" | "vegetarian" | "vegan";
  price: number;
}

const DishSchema = new mongoose.Schema<DishType>({
  image: { type: String },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  foodIcon: { type: String, enum: ["spicy", "vegetarian", "vegan"] },
  price: { type: Number, required: true },
});

const Dish = mongoose.model<DishType>("Dish", DishSchema);
export default Dish;
