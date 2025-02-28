import { Link, NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const nav = useNavigate();
  const links = [
    {
      title: "explore",
      path: "/events",
    },
  ];
  return (
    <header className="sticky top-0 left-0 w-full py-4 px-6 flex flex-row items-center justify-center gap-14 z-20 bg-white">
      <Link to={"/"} className="font-bold text-2xl">
        Event<span className="text-rose-800">Pulse</span>
      </Link>

      <nav className="flex flex-row gap-6 items-center">
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
    </header>
  );
};

export default Navbar;
