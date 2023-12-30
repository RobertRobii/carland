import { Schema, model, models } from "mongoose";

const RentalSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  carImage: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  pickUpTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Rental = models.Rental || model("Rental", RentalSchema);

export default Rental;
