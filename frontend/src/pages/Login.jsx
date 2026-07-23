import toast
from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();
    const handleDemoLogin = () => {

  localStorage.setItem("demoMode", "true");
  localStorage.setItem("token", "demo-token");
  localStorage.setItem("role", "manager");

  navigate("/dashboard");
};

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
      // ======================
// DEMO LOGIN
// ======================

if (
  formData.email === "demo@wareflow.com" &&
  formData.password === "demo123"
) {

  localStorage.setItem(
    "demoMode",
    "true"
  );

  localStorage.setItem(
    "role",
    "manager"
  );

  localStorage.setItem(
    "token",
    "demo-token"
  );

  toast.success(
    "Welcome to Demo Mode"
  );

  navigate("/dashboard");

  return;
}

      try {

        const res =
          await axios.post(
            "https://name-wareflow-backend.onrender.com/api/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );
        localStorage.setItem(
  "demoMode",
  "false"
);
        localStorage.setItem(
  "role",
  res.data.role
);

        toast.success(
"Login successful"
);

      navigate("/dashboard");

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
        <div className="mt-4 text-center">
  <p className="text-gray-400 mb-2">──────── OR ────────</p>

  <button
    type="button"
    onClick={handleDemoLogin}
    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
  >
    🚀 Continue as Demo
  </button>

  <p className="text-xs text-gray-400 mt-2">
    Explore WareFlow without creating an account.
  </p>
</div>
        <div className="mt-6 bg-slate-800 p-4 rounded-xl border border-slate-700">

  <h3 className="font-bold text-center mb-3">
    Demo Login
  </h3>

  <p>Email: demo@wareflow.com</p>

  <p>Password: demo123</p>

</div>

      </form>
    </div>
  );
}