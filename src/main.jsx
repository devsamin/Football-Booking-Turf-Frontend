// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import router from './routes/Router.jsx'
// import { RouterProvider } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//        <RouterProvider router={router}/>
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routes/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      {/* ✅ ToastContainer একবার এখানে রাখলেই সব component এ toast কাজ করবে */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  </StrictMode>,
);
