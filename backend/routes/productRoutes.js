import express from "express";

import { createProduct, getProducts, updateProduct, deleteProduct, searchProducts, getLowStockProducts, transferStock } from "../controllers/productController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router =
  express.Router();


// GET all products
router.get(
  "/",
  protect,
  getProducts
);


// Search products
router.get(
  "/search",
  protect,
  searchProducts
);


// Low stock products
router.get(
  "/low-stock",
  protect,
  getLowStockProducts
);


// Create product (Manager/Admin only)
router.post(
  "/",
  protect,
  roleMiddleware(
    "manager",
    "admin"
  ),
  createProduct
);


// Update product (Manager/Admin only)
router.put(
  "/:id",
  protect,
  roleMiddleware(
    "manager",
    "admin"
  ),
  updateProduct
);


// Delete product (Manager/Admin only)
router.delete(
  "/:id",
  protect,
  roleMiddleware(
    "manager",
    "admin"
  ),
  deleteProduct
);
router.put( "/transfer", protect, roleMiddleware( "manager", "admin" ), transferStock );

export default router;