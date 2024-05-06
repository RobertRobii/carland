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
  postedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
