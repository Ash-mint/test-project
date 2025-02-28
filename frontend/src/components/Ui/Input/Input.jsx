const Input = ({ disabled = false, className, withIcon = null, ...props }) => (
  <div className="relative focus-within:text-gray-600 text-gray-400">
    <input
      disabled={disabled}
      type="text"
      {...props}
      className={`${
        withIcon ? "pr-4 pl-10" : "px-4"
      } py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600`}
    />
    {withIcon && <div className="absolute left-3 top-2">{withIcon}</div>}
  </div>
);

export default Input;
