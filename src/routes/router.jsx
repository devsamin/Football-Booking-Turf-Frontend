import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import HomePage from "../pages/HomePage";
import Booking from "../components/booking/Booking";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/customer-dashboard",
        element: <CustomerDashboard />,
      },
    ],
  },
]);
export default router;
