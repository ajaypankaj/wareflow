import {
  useEffect,
  useState
}
from "react";

import axios
from "axios";

export default function
OrderHistory() {

  const [orders,
    setOrders] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const res =
          await axios.get(
            "https://name-wareflow-backend.onrender.com/api/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setOrders(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">

        Order History

      </h1>

      <div className="bg-slate-900 rounded-xl p-5">

        <table className="w-full text-center">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4">
                Product
              </th>

              <th>
                Quantity
              </th>

              <th>
                Warehouse
              </th>

              <th>
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order) => (

                <tr
                  key={
                    order._id
                  }
                  className="border-b border-slate-800"
                >

                  <td className="p-4">

                    {
                      order.productName
                    }

                  </td>

                  <td>

                    {
                      order.quantity
                    }

                  </td>

                  <td>

                    {
                      order.warehouse
                    }

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}