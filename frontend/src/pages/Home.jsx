import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-blue-500">
          WareFlow
        </h1>

        <div className="space-x-8">

          <a href="#features" className="hover:text-blue-400">
            Features
          </a>

          <a href="#tech" className="hover:text-blue-400">
            Tech Stack
          </a>

          <a href="#demo" className="hover:text-blue-400">
            Demo
          </a>

          <Link
            to="/login"
            className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            Login
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="text-center py-28 px-8">

        <h1 className="text-6xl font-bold leading-tight">
          Smart Warehouse
          <br />
          Management Platform
        </h1>

        <p className="text-slate-400 mt-6 text-xl max-w-3xl mx-auto">

          Manage inventory, warehouses, orders and analytics from
          one modern dashboard.

        </p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            to="/login"
            className="bg-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-700"
          >
            Login
          </Link>

          <a
            href="#features"
            className="border border-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-900"
          >
            View Features
          </a>

        </div>

      </section>

      {/* Features */}

      <section
        id="features"
        className="px-10 py-20"
      >

        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            ["📦", "Inventory", "Manage products efficiently"],
            ["📊", "Analytics", "Real-time dashboard"],
            ["🚚", "Orders", "Track customer orders"],
            ["🏬", "Warehouses", "Multiple warehouse support"],
            ["👨‍💼", "Role Based Access", "Admin & Employee"],
            ["📜", "Activity Logs", "Monitor every action"]
          ].map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-3xl p-8 hover:scale-105 transition"
            >

              <h1 className="text-5xl">
                {item[0]}
              </h1>

              <h2 className="text-2xl font-bold mt-6">
                {item[1]}
              </h2>

              <p className="text-slate-400 mt-4">
                {item[2]}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Demo */}

      <section
        id="demo"
        className="py-20 px-10"
      >

        <h2 className="text-4xl font-bold text-center mb-12">
          Demo Credentials
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-slate-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-blue-400">
              Admin
            </h2>

            <p className="mt-6">
              Email
            </p>

            <p className="text-slate-400">
              admin@wareflow.com
            </p>

            <p className="mt-5">
              Password
            </p>

            <p className="text-slate-400">
              123456
            </p>

          </div>

          <div className="bg-slate-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-green-400">
              Employee
            </h2>

            <p className="mt-6">
              Email
            </p>

            <p className="text-slate-400">
              employee@wareflow.com
            </p>

            <p className="mt-5">
              Password
            </p>

            <p className="text-slate-400">
              123456
            </p>

          </div>

        </div>

      </section>

      {/* Tech Stack */}

      <section
        id="tech"
        className="py-20 px-10"
      >

        <h2 className="text-4xl font-bold text-center mb-14">
          Tech Stack
        </h2>

        <div className="flex flex-wrap justify-center gap-5">

          {[
            "React",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT",
            "Axios"
          ].map((tech) => (

            <div
              key={tech}
              className="bg-blue-900 px-6 py-3 rounded-xl"
            >
              {tech}
            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">

        Built by <span className="text-white font-bold">Ajay Pankaj</span>

      </footer>

    </div>
  );
}