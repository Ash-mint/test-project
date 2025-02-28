import { Link } from "react-router";

/* eslint-disable react/prop-types */
const HeroSection = ({
  title,
  paragraph1,
  paragraph2,
  linkName,
  linkPath,
  img,
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center px-4 sm:px-10 py-10 md:py-20 gap-10">
      {/* Left Content */}
      <div className="flex flex-col gap-6 md:gap-8 text-center md:text-left max-w-lg">
        <h1 className="text-4xl md:text-7xl font-black text-caramel">
          {title}
        </h1>
        <p className="text-caramel text-base md:text-lg">
          {paragraph1}
          <br />
          {paragraph2}
        </p>
        <div>
          <Link
            to={linkPath}
            className="font-black text-gray-50 px-6 py-4 bg-caramel rounded-lg"
          >
            {linkName} {"->"}
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full max-w-md md:max-w-lg">
        <img src={img} alt="" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default HeroSection;
