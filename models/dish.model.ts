import mongoose, { Document, Schema } from "mongoose";
import { IRestaurant } from "./restaurant.model";

export interface IDish extends Document {
  image: string;
  name: string;
  ingredients: string[];
  tags: string[];
  price: number;
  restaurant: IRestaurant;
  isDeleted: boolean;
}

const DishSchema: Schema = new mongoose.Schema<IDish>({
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
    ref: "restaurant",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IDish>("Dish", DishSchema);
