import { Link, NavLink } from "react-router";
import AvatarDropdown from "../Ui/Dropdown/AvatarDropdown";
import { useAuth } from "../../hooks/auth";

const AuthNavbar = () => {
  const { user, logout } = useAuth();
  const links = [
    {
      title: "Explore",
      path: "/events",
    },
  ];
  return (
    <header className="sticky top-0 left-0 w-full py-4 px-6 flex flex-row items-center justify-around gap-14 z-20 bg-white">
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
          <AvatarDropdown name={user.name} email={user.email} logout={logout} />
        </div>
      </nav>
    </header>
  );
};

export default AuthNavbar;
