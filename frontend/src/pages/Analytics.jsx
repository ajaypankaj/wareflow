import { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../services/demoService";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {

  const [categoryData,
    setCategoryData] =
    useState([]);

  const [warehouseData,
    setWarehouseData] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );
    const demoMode =
  localStorage.getItem("demoMode") === "true";

  useEffect(() => {

    const fetchAnalytics =
      async () => {
        if (demoMode) {

  const products = getProducts();

  // Category Chart
  const categoryMap = {};

  products.forEach((product) => {
    categoryMap[product.category] =
      (categoryMap[product.category] || 0) + 1;
  });

  const categoryChart = Object.keys(categoryMap).map((key) => ({
    category: key,
    count: categoryMap[key],
  }));

  setCategoryData(categoryChart);

  // Warehouse Chart
  const warehouseMap = {};

  products.forEach((product) => {
    warehouseMap[product.warehouse] =
      (warehouseMap[product.warehouse] || 0) + 1;
  });

  const warehouseChart = Object.keys(warehouseMap).map((key) => ({
    name: key,
    value: warehouseMap[key],
  }));

  setWarehouseData(warehouseChart);

  return;
}

        try {

          const res =
            await axios.get(
              "https://name-wareflow-backend.onrender.com/api/products",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const products =
            res.data;

          // category chart
          const categoryMap =
            {};

          products.forEach(
            (product) => {

              const category =
                product.category;

              categoryMap[
                category
              ] =
                (
                  categoryMap[
                    category
                  ] || 0
                ) + 1;
            }
          );

          const categoryChart =
            Object.keys(
              categoryMap
            ).map((key) => ({
              category: key,
              count:
                categoryMap[
                  key
                ]
            }));

          setCategoryData(
            categoryChart
          );

          // warehouse chart
          const warehouseMap =
            {};

          products.forEach(
            (product) => {

              const warehouse =
                product.warehouse;

              warehouseMap[
                warehouse
              ] =
                (
                  warehouseMap[
                    warehouse
                  ] || 0
                ) + 1;
            }
          );

          const warehouseChart =
            Object.keys(
              warehouseMap
            ).map((key) => ({
              name: key,
              value:
                warehouseMap[
                  key
                ]
            }));

          setWarehouseData(
            warehouseChart
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchAnalytics();

  }, []);

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-900 rounded-2xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Products by Category
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={categoryData}
            >

              <XAxis
                dataKey="category"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Warehouse Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={warehouseData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {warehouseData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}