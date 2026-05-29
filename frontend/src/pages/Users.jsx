
import {
  useState
} from "react";

import axios
from "axios";

import toast
from "react-hot-toast";

export default function
Users() {

  const token =
    localStorage.getItem(
      "token"
    );

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role:
        "employee"
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [
          e.target.name
        ]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://name-wareflow-backend.onrender.com/api/auth/register",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "User created"
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          role:
            "employee"
        });

      } catch (error) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Error"
        );
      }
    };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">

        👥 Create User

      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-slate-900 p-8 rounded-3xl max-w-xl space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <select
          name="role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
          className="w-full bg-slate-800 p-4 rounded-xl"
        >

          <option value="employee">

            Employee

          </option>

          <option value="manager">

            Manager

          </option>

        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >

          Create User

        </button>

      </form>

    </div>
  );
}

