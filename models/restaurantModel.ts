import mongoose from "mongoose";

export interface IRestaurant extends Document {
  image?: string;
  title: string;
  subTitle: string;
  foodIcon?: "spicy" | "vegetarian" | "vegan";
  price: number;
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
  foodIcon: {
    type: String,
    enum: ["spicy", "vegetarian", "vegan"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const RestaurantModel = mongoose.model<IRestaurant>(
  "Restaurant",
  restaurantSchema
);

export default RestaurantModel;
