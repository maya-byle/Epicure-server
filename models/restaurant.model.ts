import mongoose, { Schema } from "mongoose";
import { IDish } from "./dish.model";
import { IChef } from "./chef.model";

export interface IRestaurant extends Document {
  image: string;
  title: string;
  subTitle: string;
  chef: IChef;
  dishes: IDish[];
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
  dishes: [{ type: Schema.Types.ObjectId, ref: "dish" }],
});

const RestaurantModel = mongoose.model<IRestaurant>(
  "Restaurant",
  restaurantSchema
);

export default RestaurantModel;
