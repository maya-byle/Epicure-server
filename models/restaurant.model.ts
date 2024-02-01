import mongoose, { Schema } from "mongoose";
import { IChef } from "./chef.model";
import DeleteStatus from "../constants";

export interface IRestaurant extends Document {
  image: string;
  title: string;
  subTitle: string;
  chef: IChef;
  status: DeleteStatus;
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
  chef: { type: Schema.Types.ObjectId, ref: "Chef" },
  status: {
    type: String,
    enum: DeleteStatus,
    default: DeleteStatus.ACTIVE,
  },
});

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
