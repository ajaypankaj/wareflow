
import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

export default function Dashboard() {

  const role =
    localStorage.getItem(
      "role"
    );

  const token =
    localStorage.getItem(
      "token"
    );

  const [stats,
    setStats] =
    useState({});

  const [activities,
    setActivities] =
    useState([]);

  const fetchStats =
    async () => {

      try {

        const res =
          await axios.get(
            "https://name-wareflow-backend.onrender.com/api/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchActivities =
    async () => {

      try {

        const res =
          await axios.get(
            "https://name-wareflow-backend.onrender.com/api/activity",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setActivities(
          res.data.slice(
            0,
            5
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchStats();
    fetchActivities();

    const interval =
      setInterval(() => {

        fetchStats();
        fetchActivities();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const topWarehouse =
    stats.lowStockProducts
      ?.length > 0
      ? stats.lowStockProducts[0]
          ?.warehouse
      : "No warehouse";

  const inventoryHealth =
    stats.lowStock < 3
      ? "Excellent"
      : stats.lowStock < 7
      ? "Good"
      : "Needs Attention";

  const topCategory =
    "Electronics";

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-4">

        Dashboard

      </h1>

      {role ===
        "employee" && (

        <div className="bg-blue-900/30 border border-blue-700 rounded-2xl p-4 mb-6">

          Welcome Employee 👷

          <p className="text-slate-300 mt-2">

            You have limited access.

          </p>

        </div>
      )}

      {role ===
        "manager" && (

        <div className="bg-slate-900 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-bold mb-5">

            ⚠ Low Stock Alerts

          </h2>

          {stats
            .lowStockProducts
            ?.length ===
          0 ? (

            <p className="text-slate-400">

              No low stock alerts

            </p>

          ) : (

            <div className="space-y-3">

              {stats
                .lowStockProducts
                ?.map(
                  (
                    product
                  ) => (

                    <div
                      key={
                        product._id
                      }
                      className="bg-slate-800 p-4 rounded-xl flex justify-between"
                    >

                      <span>

                        {
                          product.name
                        }

                      </span>

                      <span className="text-red-400 font-bold">

                        Qty{" "}
                        {
                          product.quantity
                        }

                      </span>

                    </div>
                  )
                )}

            </div>
          )}

        </div>
      )}

      <div className="bg-slate-900 rounded-3xl p-6 mb-6 border border-slate-800">

        <h2 className="text-2xl font-bold mb-5">

          🤖 Smart Insights

        </h2>

        <div className="space-y-3 text-slate-300">

          <p>

            ⚠ {
              stats.lowStock ||
              0
            } products are
            low stock

          </p>

          <p>

            🏬 {
              topWarehouse
            } has active
            inventory

          </p>

          <p>

            📈 {
              topCategory
            } is top
            category

          </p>

          <p>

            💰 Inventory
            health:{" "}

            <span className="font-bold text-green-400">

              {
                inventoryHealth
              }

            </span>

          </p>

        </div>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6 mb-6 border border-slate-800">

        <h2 className="text-2xl font-bold mb-5">

          🕒 Recent Activity

        </h2>

        <div className="space-y-3">

          {activities
            .length ===
          0 ? (

            <p className="text-slate-400">

              No recent
              activity

            </p>

          ) : (

            activities.map(
              (
                activity
              ) => (

                <div
                  key={
                    activity._id
                  }
                  className="bg-slate-800 p-4 rounded-xl flex justify-between"
                >

                  <div>

                    <p className="font-semibold">

                      {
                        activity.action
                      }

                    </p>

                    <p className="text-slate-400 text-sm">

                      {
                        activity.performedBy
                      }

                    </p>

                  </div>

                  <p className="text-slate-400 text-sm">

                    {
                      new Date(
                        activity.createdAt
                      ).toLocaleString()
                    }

                  </p>

                </div>
              )
            )
          )}

        </div>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800">

          <p className="text-slate-400 text-lg">

            📦 Total Products

          </p>

          <h1 className="text-5xl font-bold mt-4">

            {
              stats.totalProducts
            }

          </h1>

        </div>

        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800">

          <p className="text-slate-400 text-lg">

            🧾 Total Orders

          </p>

          <h1 className="text-5xl font-bold mt-4">

            {
              stats.totalOrders
            }

          </h1>

        </div>

        <div className="bg-gradient-to-br from-red-900 to-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800">

          <p className="text-slate-400 text-lg">

            ⚠ Low Stock

          </p>

          <h1 className="text-5xl font-bold mt-4 text-red-400">

            {
              stats.lowStock
            }

          </h1>

        </div>

        {role ===
          "manager" && (

          <div className="bg-gradient-to-br from-green-900 to-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800">

            <p className="text-slate-400 text-lg">

              💰 Inventory Value

            </p>

            <h1 className="text-4xl font-bold mt-4">

              ₹{
                stats.inventoryValue
              }

            </h1>

          </div>
        )}

      </div>

    </div>
  );
}

