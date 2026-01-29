import { Outlet } from "react-router-dom";
import Navbar from "../../ShearComponents/Navbar";
import Footer from "../../ShearComponents/Footer";


const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;