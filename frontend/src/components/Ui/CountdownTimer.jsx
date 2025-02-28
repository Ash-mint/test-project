import { useState, useEffect } from "react";

const CountdownTimer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [countDownTime, setCountDownTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDownTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatted = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <div key={unit} className="flex flex-col gap-1 relative">
          <div className="h-12 w-12 sm:w-16 sm:h-16 flex justify-between items-center bg-[#343650] rounded-lg">
            <div className="relative h-2 w-2 sm:h-2.5 sm:w-2.5 -left-[4px] rounded-full bg-[#191A24]"></div>
            <span className="sm:text-4xl text-xl font-semibold text-[#a5b4fc]">
              {formatted(countDownTime[unit])}
            </span>
            <div className="relative h-2 w-2 sm:h-2.5 sm:w-2.5 -right-[4px] rounded-full bg-[#191A24]"></div>
          </div>
          <span className="text-[#8486A9] text-[8px] sm:text-xs text-center capitalize">
            {countDownTime[unit] === 1 ? unit.slice(0, -1) : unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
