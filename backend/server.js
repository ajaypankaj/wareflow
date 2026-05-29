import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes
from "./routes/testRoutes.js";
import productRoutes
from "./routes/productRoutes.js";
import dashboardRoutes
from "./routes/dashboardRoutes.js";
import orderRoutes
from "./routes/orderRoutes.js";
import activityRoutes
from "./routes/activityRoutes.js";





dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/test",
  testRoutes
);
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/activity",
  activityRoutes
);

app.get("/", (req, res) => {
  res.send("WareFlow Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

