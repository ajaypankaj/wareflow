import { useNavigate }
from "react-router-dom";
import {
  useEffect,
  useState
} from "react";

import axios
from "axios";
export default function Navbar() {

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      "role"
    );
    const [notifications,
  setNotifications] =
  useState([]);

const [showNotifications,
  setShowNotifications] =
  useState(false);

const token =
  localStorage.getItem(
    "token"
  );
  useEffect(() => {

const fetchNotifications =
async () => {

try {

const res =
await axios.get(
"https://name-wareflow-backend.onrender.com/api/products/low-stock",
{
headers: {
Authorization:
`Bearer ${token}`
}
}
);

setNotifications(
res.data
);

} catch (error) {

console.log(error);
}
};

fetchNotifications();

const interval =
setInterval(() => {

fetchNotifications();

}, 5000);

return () =>
clearInterval(
interval
);

}, []);

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      navigate(
        "/login"
      );
    };

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex justify-between items-center sticky top-0 z-50">

      <div>

        <h1 className="text-white text-2xl font-bold">

          WareFlow Dashboard

        </h1>

        <p className="text-slate-400">

          Smart Warehouse
          Management System

        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="bg-slate-800 px-4 py-2 rounded-full flex items-center gap-2">

          <span className="text-xl">

            👤

          </span>

          <div>

            <p className="text-white font-semibold">

              {role}

            </p>

            <p className="text-slate-400 text-sm">

              Logged In

            </p>

          </div>

        </div>
        <div className="relative">

  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
    className="bg-slate-800 px-4 py-3 rounded-xl text-xl relative"
  >

    🔔

    {notifications.length >
      0 && (

      <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-6 h-6 flex items-center justify-center">

        {
          notifications.length
        }

      </span>
    )}

  </button>

  {showNotifications && (

    <div className="absolute right-0 mt-3 w-80 bg-slate-900 rounded-2xl border border-slate-800 p-4 z-50">

      <h2 className="font-bold text-lg mb-3 text-white">

        Notifications

      </h2>

      {notifications.length ===
      0 ? (

        <p className="text-slate-400">

          No alerts

        </p>

      ) : (

        notifications.map(
          (
            item
          ) => (

            <div
              key={
                item._id
              }
              className="border-b border-slate-800 py-3 text-sm text-white"
            >

              ⚠{" "}
              {
                item.name
              }{" "}
              is low stock
              (
              Qty:
              {" "}
              {
                item.quantity
              }
              )

            </div>
          )
        )
      )}

    </div>
  )}

</div>
 {localStorage.getItem("demoMode") === "true" && (
  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-2">
    🟢 DEMO MODE
  </span>
)}
        <button
          onClick={
            handleLogout
          }
          className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-semibold"
        >

          Logout

        </button>

      </div>

    </div>
  );
}