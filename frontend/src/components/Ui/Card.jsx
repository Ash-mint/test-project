import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import LittleCalendar from "./Calendar/LittleCalendar";

const Card = ({ title, link = "#", image, date, duration, location }) => {
  return (
    <div className="max-w-64 md:max-w-full overflow-hidden">
      <Link to={link}>
        <div
          className={`relative w-56 h-32 md:w-72 md:h-40 bg-gray-500 rounded-md overflow-hidden`}
        >
          <div className="rounded-md overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              src={`${image}`}
              alt={title + " poster"}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <span className="text-sm absolute bottom-3 left-3 text-gray-50 font-semibold line-clamp-1 inline-flex flex-row gap-2 items-center">
            <MapPin size={20} />
            {location}
          </span>
          <div className="absolute top-2 right-2">
            <LittleCalendar size="small" date={date} />
          </div>
        </div>
      </Link>
      <Link
        to={link}
        className="font-medium text-base md:text-xl max-w-72 mt-1  break-all line-clamp-1 hover:text-orange-900 transition-colors ease-in"
      >
        {title}
      </Link>

      <span className="text-xs font-light inline-flex items-center gap-2 flex-row w-full mt-2 justify-between">
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}

        <span className="inline-flex gap-1 items-center">
          <Clock size={15} /> {duration}h
        </span>
      </span>
    </div>
  );
};

export default Card;
