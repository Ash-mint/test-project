import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle
import AvatarDropdown from "../Ui/Dropdown/AvatarDropdown";
import { useAuth } from "../../hooks/auth";

const AuthNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Explore", path: "/events/" },
    { title: "Create", path: "/events/create" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full py-4 px-6 flex items-center justify-between z-20 bg-white shadow-md">
      <Link to={"/"} className="font-bold text-2xl">
        Event<span className="text-rose-800">Pulse</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="flex flex-row gap-6 items-center">
        <ul className="hidden md:flex flex-row gap-6 items-center">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-orange-900 font-medium" : "font-medium"
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Toggle */}
        <div className="flex flex-row items-center gap-3">
          <AvatarDropdown name={user.name} email={user.email} logout={logout} />

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 items-center">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-900 font-medium text-lg"
                  : "font-medium text-lg"
              }
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default AuthNavbar;
