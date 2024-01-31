import mongoose, { Schema } from "mongoose";
import { IChef } from "./chef.model";

export interface IRestaurant extends Document {
  image: string;
  title: string;
  subTitle: string;
  chef: IChef;
  isDeleted: boolean;
}

const restaurantSchema: Schema = new mongoose.Schema<IRestaurant>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
