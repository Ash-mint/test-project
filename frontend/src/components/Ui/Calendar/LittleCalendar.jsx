import { getDateInfo } from "../../../utils";

const LittleCalendar = ({ date, size = "big" }) => {
  const { dayName, dayNumber, month } = getDateInfo(date);

  return size === "big" ? (
    <div className="w-[95px] h-[100px]">
      <div className="bg-[#187b7a] h-1/6 w-full flex justify-center items-center font-black text-white uppercase py-2 text-sm">
        {dayName}
      </div>
      <div className="h-full bg-[#22b0af] flex flex-col gap-2 justify-center items-center">
        <h1 className="text-4xl font-bold text-white">{dayNumber}</h1>
        <span className="text-sm text-gray-100 font-bold">{month}</span>
      </div>
    </div>
  ) : (
    <div className="w-12 h-12 rounded-full bg-[#22b0af] flex flex-col justify-center items-center">
      <span className="text-lg font-bold text-gray-100">{dayNumber}</span>
      <span className="text-xs text-gray-200 font-medium">
        {month.slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
};

export default LittleCalendar;
