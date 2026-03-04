// import { Outlet } from "react-router-dom";
// import Navbar from "../../ShearComponents/Navbar";
// import Footer from "../../ShearComponents/Footer";
// import FullScreenLoader from "../ui/FullScreenLoader";

// export const LoaderContext = React.createContext();

// const RootLayout = () => {
//   const [loading, setLoading] = useState(false);
//   return (
//     <div>
//       <LoaderContext.Provider value={{ loading, setLoading }}>
//         {loading && <FullScreenLoader />}
//         <Navbar />
//         <Outlet />
//         <Footer />
//       </LoaderContext.Provider>
//     </div>
//   );
// };

// export default RootLayout;

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ShearComponents/Navbar";
import Footer from "../../ShearComponents/Footer";
import FullScreenLoader from "../ui/FullScreenLoader";
import { injectLoader } from "../../services/api";

export const LoaderContext = React.createContext();

const RootLayout = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    injectLoader(setLoading);
  }, []);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <FullScreenLoader />}

      <Navbar />
      <Outlet />
      <Footer />
    </LoaderContext.Provider>
  );
};

export default RootLayout;
