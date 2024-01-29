import mongoose from "mongoose";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
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
    enum: ["spicy", "vegitarian", "vegan"],
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
