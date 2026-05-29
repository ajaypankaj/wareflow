import { useEffect, useState }
from "react";

import axios
from "axios";

import toast
from "react-hot-toast";

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

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/products",
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

      try {

        await axios.post(
          "http://localhost:5000/api/orders",
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