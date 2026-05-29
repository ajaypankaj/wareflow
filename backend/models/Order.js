import mongoose from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      product: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      productName: {
        type: String,
        required: true
      },

      quantity: {
        type: Number,
        required: true
      },

      warehouse: {
        type: String
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;