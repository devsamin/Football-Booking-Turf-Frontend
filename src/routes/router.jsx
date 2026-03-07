import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import HomePage from "../pages/HomePage";
// import Booking from "../components/booking/Booking";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";
import BookingPage from "../components/booking/BookingPage";
import MyBookings from "../components/booking/MyBookings";
import PaymentSuccessPage from "../components/payment/PaymentSuccessPage";
import NotFoundPage from "../components/ui/NotFoundPage";

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
        // element: <Booking />,
        element: <BookingPage />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },

      {
        path: "/my-bookings",
        element: <MyBookings />,
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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
