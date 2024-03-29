import mongoose, { Schema } from "mongoose";
import { IChef } from "./chef.model";
import DocumentStatus from "../constants";

export interface IRestaurant extends Document {
  image: string;
  name: string;
  chef: IChef;
  rank: number;
  status: DocumentStatus;
}

const restaurantSchema: Schema = new mongoose.Schema<IRestaurant>({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  chef: { type: Schema.Types.ObjectId, ref: "Chef" },
  rank: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  },
});

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
