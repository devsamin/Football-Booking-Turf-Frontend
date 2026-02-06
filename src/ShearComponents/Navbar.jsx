import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Check if user is logged in
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-green-600 hover:text-green-700"
          >
            প্রাইম ফুটবল টার্ফ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              বুকিং করুন
            </Link>

            {token ? (
              <>
                <Link
                  to="/customer-dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border hover:bg-accent cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  আমার ড্যাশবোর্ড
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 border hover:bg-accent cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  <LogOut className="h-4 w-4" />
                  লগআউট
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
              >
                লগইন / সাইন আপ
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 cursor-pointer"
            aria-label="Toggle Menu"
            style={{ cursor: "pointer" }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2 cursor-pointer">
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-md text-sm font-medium hover:bg-accent cursor-pointer"
            >
              বুকিং করুন
            </Link>

            {token ? (
              <>
                <Link
                  to="/customer-dashboard"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded-md text-sm font-medium hover:bg-accent cursor-pointer"
                >
                  আমার ড্যাশবোর্ড
                </Link>

                {/* 🔥 Logout using div to avoid button cursor override */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogout();
                      setOpen(false);
                    }
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-accent cursor-pointer select-none"
                  style={{ cursor: "pointer" }}
                >
                  লগআউট
                </div>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 cursor-pointer"
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
