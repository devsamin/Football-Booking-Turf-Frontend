import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const navLinkStyle = (path) =>
    `relative px-4 py-2 text-sm font-medium transition-all duration-200
     ${
       location.pathname === path
         ? "text-green-600"
         : "text-gray-700 hover:text-green-600"
     }`;

  return (
    <nav className="backdrop-blur-md bg-white/80 border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 tracking-wide hover:scale-105 transition-transform duration-200"
          >
            প্রাইম ফুটবল টার্ফ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/booking" className={navLinkStyle("/booking")}>
              বুকিং করুন
            </Link>

            {token ? (
              <>
                <Link
                  to="/customer-dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-green-200 rounded-lg hover:bg-green-50 transition"
                >
                  <User size={16} />
                  ড্যাশবোর্ড
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-green-200 rounded-lg hover:bg-green-50 text-green-600 transition"
                >
                  <LogOut size={16} />
                  লগআউট
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md transition"
              >
                লগইন / সাইন আপ
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-green-50 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 pb-4 space-y-3 bg-white rounded-xl shadow-lg p-4">
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-green-50 text-sm font-medium"
            >
              বুকিং করুন
            </Link>

            {token ? (
              <>
                <Link
                  to="/customer-dashboard"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-green-50 text-sm font-medium"
                >
                  আমার ড্যাশবোর্ড
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-green-50 text-sm font-medium text-green-600"
                >
                  লগআউট
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-medium text-center"
              >
                লগইন / সাইন আপ
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
