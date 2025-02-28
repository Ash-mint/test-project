const Button = ({ type = "submit", disabled, className, ...props }) => (
  <button
    type={type}
    className={`${className} bg-orange-900 min-w-[165px] text-white font-bold py-3 px-6 rounded-md transition-all ease-in
  ${
    disabled
      ? "opacity-50"
      : "hover:outline hover:outline-orange-900 hover:text-orange-950 hover:bg-white cursor-pointer"
  }
`}
    {...props}
  />
);

export default Button;
