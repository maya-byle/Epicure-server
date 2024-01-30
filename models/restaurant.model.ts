import mongoose, { Schema } from "mongoose";
import { IChef } from "./chef.model";

export interface IRestaurant extends Document {
  image: string;
  title: string;
  subTitle: string;
  chef: IChef;
}

const restaurantSchema = new mongoose.Schema<IRestaurant>({
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  chef: { type: Schema.Types.ObjectId, ref: "chef" },
});

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
