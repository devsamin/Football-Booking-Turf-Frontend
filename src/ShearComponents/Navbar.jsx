import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
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
              to="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-black hover:bg-primary/90"
            >
              হোম
            </Link>

            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              বুকিং করুন
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            >
              লগইন / সাইন আপ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              হোম
            </Link>

            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              বুকিং করুন
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
            >
              লগইন / সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
