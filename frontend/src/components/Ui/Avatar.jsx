const Avatar = ({ name, size = "small" }) => {
  const sizes = {
    small: "w-10 h-10",
    medium: "w-28 h-28",
    big: "w-44 h-44 text-6xl outline outline-14 outline-white",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${sizes[size]}`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300 uppercase">
        {name.slice(0, 2)}
      </span>
    </div>
  );
};

export default Avatar;
