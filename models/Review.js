import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reviewMessage: {
    type: String,
    required: true,
  },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
