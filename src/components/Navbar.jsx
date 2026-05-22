import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-orange-500 font-semibold" : "hover:text-orange-400"
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/all-pets"
        className={({ isActive }) =>
          isActive ? "text-orange-500 font-semibold" : "hover:text-orange-400"
        }
      >
        All Pets
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-requests"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-semibold"
                : "hover:text-orange-400"
            }
          >
            My Requests
          </NavLink>
          <NavLink
            to="/add-pet"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-semibold"
                : "hover:text-orange-400"
            }
          >
            Add Pet
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
  <img
    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=40&h=40&fit=crop"
    alt="logo"
    className="w-9 h-9 rounded-full object-cover border-2 border-orange-400"
  />
  <span className="text-xl font-bold text-orange-500">PawsHome</span>
</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          {navLinks}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-orange-400 object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.displayName?.split(" ")[0]}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/my-listings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/my-requests"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    My Requests
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-gray-700 border-t">
          {navLinks}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left text-red-500 font-medium"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-orange-500 font-semibold">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
