import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    sku: {
      type: String,
      unique: true
    },

    category: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 0
    },

    price: {
      type: Number,
      required: true
    },

    supplier: {
      type: String,
      default: "Unknown"
    },

    warehouse: {
      type: String,
      default: "Main Warehouse"
    },
    image: {
type: String,
default: ""
},

    lowStockThreshold: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;