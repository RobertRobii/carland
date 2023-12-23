import { Schema, model, models } from "mongoose";

const CarSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  info: [
    {
      icon: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Car = models.Car || model("Car", CarSchema);

export default Car;
