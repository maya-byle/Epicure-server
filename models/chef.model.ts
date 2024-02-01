import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "./restaurant.model";
import DeleteStatus from "../constants";

export interface IChef extends Document {
  image: string;
  name: string;
  description: string;
  restaurants: IRestaurant[];
  status: DeleteStatus;
}

const chefSchema: Schema = new mongoose.Schema<IChef>({
  name: {
    type: String,
    required: true,
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
      ref: "restaurant",
    },
  ],
  status: {
    type: String,
    enum: [DeleteStatus.ACTIVE, DeleteStatus.DELETED],
    default: DeleteStatus.ACTIVE,
  },
});

export default mongoose.model<IChef>("Chef", chefSchema);
