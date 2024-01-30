import { ObjectId } from "mongodb";
import mongoose, { Document } from "mongoose";
import { IRestaurant } from "./restaurantModel";
interface IDish extends Document {
  image: string;
  title: string;
  subTitle: string;
  price: number;
  foodIcon?: "spicy" | "vegetarian" | "vegan";
  restaurant: IRestaurant;
}

const DishSchema = new mongoose.Schema<IDish>({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    //ingredients
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  foodIcon: [
    {
      type: String,
    },
  ],
  restaurant: {
    type: ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Dish = mongoose.model<IDish>("Dish", DishSchema);
export default Dish;
