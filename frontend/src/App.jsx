import { Toaster }
from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Warehouses from "./pages/Warehouses";
import Orders from "./pages/Orders";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import ActivityLogs
from "./pages/ActivityLogs";
import TransferHistory
from "./pages/TransferHistory";
import Users
from "./pages/Users";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Toaster
  position="top-center"
/>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

       <Route
  path="/"
  element={<Home />}
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Inventory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/warehouses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Warehouses />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Orders />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OrderHistory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
path="/activity"
element={
<ProtectedRoute>

<DashboardLayout>
<ActivityLogs />
</DashboardLayout>

</ProtectedRoute>
}
/>

<Route
path="/users"
element={
<ProtectedRoute>

<DashboardLayout>
<Users />
</DashboardLayout>

</ProtectedRoute>
}
/>
<Route
path="/transfer-history"
element={
<ProtectedRoute>

<DashboardLayout>
<TransferHistory />
</DashboardLayout>

</ProtectedRoute>
}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;