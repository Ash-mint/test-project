import { ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router";

const StatCard = ({ name, stat = 0, link = "" }) => {
  const location = useLocation(); // Get current URL
  const isActive = location.hash === `${link}`; // Check if hash matches

  return (
    <Link
      to={`${link}`}
      className={`w-[290px] px-6 py-2 border-2 border-gray-300 rounded-md cursor-pointer ${
        isActive ? `border-t-4 border-t-blue-600` : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-gray-800 text-xl">{name}</span>
          <span
            className={`${
              isActive ? "text-blue-600" : "text-gray-800"
            } font-semibold text-2xl`}
          >
            {stat}
          </span>
        </div>
        <ChevronRight />
      </div>
    </Link>
  );
};

export default StatCard;
