import Product
from "../models/Product.js";

import Order
from "../models/Order.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const products =
        await Product.find();

      const totalProducts =
        products.length;

      const totalOrders =
        await Order.countDocuments();

      const lowStockProducts =
        products.filter(
          (product) =>
            product.quantity <
            product.lowStockThreshold
        );

      const lowStock =
        lowStockProducts.length;

      const inventoryValue =
        products.reduce(
          (total, product) =>
            total +
            (
              product.price *
              product.quantity
            ),
          0
        );

      res.json({
        totalProducts,
        totalOrders,
        lowStock,
        inventoryValue,
        lowStockProducts
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });
    }
};