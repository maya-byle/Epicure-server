import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "./restaurant.model";
import DocumentStatus from "../constants";

export interface IChef extends Document {
  image: string;
  name: string;
  description: string;
  restaurants: IRestaurant[];
  isChefOfTheWeek: boolean;
  status: DocumentStatus;
}

const chefSchema: Schema = new mongoose.Schema<IChef>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  isChefOfTheWeek: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  },
});

export default mongoose.model<IChef>("Chef", chefSchema);
