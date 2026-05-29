import toast
from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );
        localStorage.setItem(
  "role",
  res.data.role
);

        toast.success(
"Login successful"
);

        navigate("/");

      } catch (error) {

        toast.error(
"Invalid credentials"
);

        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl w-[400px]"
      >

        <h1 className="text-white text-3xl font-bold mb-6 text-center">

          WareFlow Login

        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded mb-6"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg"
        >

          Login

        </button>

      </form>
    </div>
  );
}