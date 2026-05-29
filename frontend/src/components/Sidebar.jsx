import { Link } from "react-router-dom";

export default function Sidebar() {

  const role =
    localStorage.getItem(
      "role"
    );

  const isAdmin =
    role === "admin" ||
    role === "manager";

  return (
    <div className="w-64 bg-slate-900 min-h-screen text-white p-5 border-r border-slate-800">

      <h1 className="text-3xl font-bold mb-10">

        WareFlow

      </h1>

      <div className="space-y-3">

        <Link
          to="/"
          className="block p-3 rounded hover:bg-slate-800 transition"
        >
          Dashboard
        </Link>

        {isAdmin && (
          <Link
            to="/inventory"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            Inventory
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/analytics"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            Analytics
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/warehouses"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            Warehouses
          </Link>
        )}

        <Link
          to="/orders"
          className="block p-3 rounded hover:bg-slate-800 transition"
        >
          Orders
        </Link>

        <Link
          to="/order-history"
          className="block p-3 rounded hover:bg-slate-800 transition"
        >
          Order History
        </Link>
        {isAdmin && (
  <Link
    to="/activity"
    className="block p-3 rounded hover:bg-slate-800 transition"
  >

    Activity Logs

  </Link>
)}
<Link
to="/transfer-history"
className="block p-3 rounded hover:bg-slate-800 transition"
>

Transfer History

</Link>
{role ===
"manager" && (

<Link
to="/users"
className="block p-3 rounded hover:bg-slate-800 transition"
>

Users

</Link>

)}

      </div>

    </div>
  );
}