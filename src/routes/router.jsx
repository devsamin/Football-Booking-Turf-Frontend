import {
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import HomePage from "../pages/HomePage";
import Booking from "../components/booking/Booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children : [
        {
            path : '/',
            element : <HomePage/>
        },
        {
            path : '/booking',
            element : <Booking/>
        }
    ]
  },
]);
export default router