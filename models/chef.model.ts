import mongoose, { Schema } from "mongoose";
import { IRestaurant } from "./restaurant.model";

export interface IChef extends Document {
  image: string;
  name: string;
  description: string;
  restaurants: IRestaurant[];
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
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
});

export default mongoose.model<IChef>("Chef", chefSchema);
