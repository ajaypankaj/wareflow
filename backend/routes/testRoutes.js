import express from "express";

import {
  dashboard,
  adminPanel
} from "../controllers/testController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  dashboard
);

router.get(
  "/admin",
  protect,
  adminOnly,
  adminPanel
);

export default router;