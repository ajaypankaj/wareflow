import { useEffect, useState }
from "react";

import axios
from "axios";

import toast
from "react-hot-toast";
import {
  getProducts,
  saveProducts,
  getOrders,
  saveOrders
} from "../services/demoService";

export default function Orders() {

  const [products,
    setProducts] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      productId: "",
      quantity: ""
    });

  const token =
    localStorage.getItem(
      "token"
    );
    const demoMode =
  localStorage.getItem("demoMode") === "true";

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {
      if (demoMode) {
  setProducts(getProducts());
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

        setProducts(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const placeOrder =
    async (e) => {

      e.preventDefault();
      if (demoMode) {

  const products = getProducts();

  const updatedProducts = products.map((p) => {

    if (
      p._id === formData.productId
    ) {

      if (
        Number(p.quantity) <
        Number(formData.quantity)
      ) {

        toast.error(
          "Insufficient stock"
        );

        return p;
      }

      return {
        ...p,
        quantity:
          Number(p.quantity) -
          Number(formData.quantity)
      };
    }

    return p;

  });

  saveProducts(updatedProducts);

  const orders = getOrders();

  const orderedProduct =
    products.find(
      p => p._id === formData.productId
    );

  orders.unshift({
    _id: Date.now().toString(),
    productName: orderedProduct?.name,
    quantity: Number(formData.quantity),
    warehouse: orderedProduct?.warehouse,
    status: "Completed",
    date: new Date().toLocaleString()
  });

  saveOrders(orders);

  toast.success("Order Placed");

  setProducts(updatedProducts);

  setFormData({
    productId: "",
    quantity: ""
  });

  return;
}

      try {

        await axios.post(
          "https://name-wareflow-backend.onrender.com/api/orders",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Order Placed"
        );

        setFormData({
          productId: "",
          quantity: ""
        });

        fetchProducts();

      } catch (error) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Order failed"
        );

        console.log(error);
      }
    };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-8">

        Orders

      </h1>

      <form
        onSubmit={
          placeOrder
        }
        className="bg-slate-900 p-6 rounded-xl w-[450px]"
      >

        <select
          value={
            formData.productId
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              productId:
                e.target.value
            })
          }
          className="w-full p-4 rounded bg-slate-800 mb-4"
        >

          <option value="">
            Select Product
          </option>

          {products.map(
            (product) => (

              <option
                key={
                  product._id
                }
                value={
                  product._id
                }
              >

                {product.name}
                {" "}
                (
                Qty:
                {" "}
                {
                  product.quantity
                }
                )

              </option>
            )
          )}

        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={
            formData.quantity
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity:
                e.target.value
            })
          }
          className="w-full p-4 rounded bg-slate-800 mb-5"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg w-full"
        >

          Place Order

        </button>

      </form>

    </div>
  );
}