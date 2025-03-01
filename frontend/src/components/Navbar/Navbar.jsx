import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const nav = useNavigate();
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
      <nav className="hidden md:flex flex-row gap-6 items-center">
        <ul className="flex flex-row gap-6 items-center">
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
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={() => nav("/login")}
            className="outline min-w-[165px] outline-orange-900 text-orange-800 font-bold py-3 px-6 rounded-md cursor-pointer hover:outline-orange-400 hover:text-orange-950 transition-all ease-in"
          >
            Login
          </button>
          <button
            onClick={() => nav("/register")}
            className="bg-orange-900 min-w-[165px] text-white font-bold py-3 px-6 rounded-md cursor-pointer hover:outline hover:outline-orange-900 hover:text-orange-950 hover:bg-white transition-all ease-in"
          >
            Sign up for free
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 items-center md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-900 font-medium text-lg"
                  : "font-medium text-lg"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              nav("/login");
            }}
            className="outline w-full outline-orange-900 text-orange-800 font-bold py-3 px-6 rounded-md cursor-pointer hover:outline-orange-400 hover:text-orange-950 transition-all ease-in"
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              nav("/register");
            }}
            className="bg-orange-900 w-full text-white font-bold py-3 px-6 rounded-md cursor-pointer hover:outline hover:outline-orange-900 hover:text-orange-950 hover:bg-white transition-all ease-in"
          >
            Sign up for free
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
