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
  chef: { type: Schema.Types.ObjectId, ref: "chef" },
  status: {
    type: String,
    enum: [DeleteStatus.ACTIVE, DeleteStatus.DELETED],
    default: DeleteStatus.ACTIVE,
  },
});

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
