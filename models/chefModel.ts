import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chefSchema = new Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    default: "",
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
  restaurants: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

module.exports = mongoose.model("Chef", chefSchema);
