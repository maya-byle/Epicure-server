import mongoose, { Document, Schema } from "mongoose";
import { IRestaurant } from "./restaurant.model";

export interface IDish extends Document {
  image: string;
  name: string;
  ingredients: string[];
  tags: string[];
  price: number;
  restaurant: IRestaurant;
}

const DishSchema = new mongoose.Schema<IDish>({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

export default mongoose.model<IDish>("Dish", DishSchema);
