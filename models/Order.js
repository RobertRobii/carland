import { Schema, model, models } from "mongoose";

const OredrSchema = new Schema({});

const Order = models.Order || model("Order", OredrSchema);

export default Order;
