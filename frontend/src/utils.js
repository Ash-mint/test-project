export function getDateInfo(date) {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date passed to getDateInfo:", date);
    return { dayName: "", dayNumber: "", month: "" };
  }

  const optionsDay = { weekday: "long" };
  const optionsDayNumber = { day: "2-digit" };
  const optionsMonth = { month: "long" };

  return {
    dayName: new Intl.DateTimeFormat("en-US", optionsDay).format(dateObj),
    dayNumber: new Intl.DateTimeFormat("en-US", optionsDayNumber).format(
      dateObj
    ),
    month: new Intl.DateTimeFormat("en-US", optionsMonth).format(dateObj),
  };
}
