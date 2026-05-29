import Product
from "../models/Product.js";

import Order
from "../models/Order.js";

export const createOrder =
  async (req, res) => {

    try {

      const {
        productId,
        quantity
      } = req.body;

      const product =
        await Product.findById(
          productId
        );

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found"
          });
      }

      if (
        quantity >
        product.quantity
      ) {
        return res
          .status(400)
          .json({
            message:
              "Insufficient stock"
          });
      }

      // stock reduce
      product.quantity -=
        quantity;

      await product.save();

      const order =
        await Order.create({
          product:
            product._id,

          productName:
            product.name,

          quantity,

          warehouse:
            product.warehouse
        });

      res.status(201).json(
        order
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });
    }
};
export const getOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .sort({
            createdAt: -1
          });

      res.json(
        orders
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });
    }
};