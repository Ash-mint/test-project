const Masonry = () => {
  return (
    <div>
      {/* <!-- Masonry Cards --> */}
      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative">
        <div className="w-full text-center md:text-left md:absolute md:-top-4 md:right-44 lg:w-40">
          <h1 className="text-3xl md:text-4xl mb-6 md:mb-0 lg:text-6xl font-black text-caramel">
            Trusted by industries like yours
          </h1>
        </div>
        {/* <!-- Grid --> */}
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:self-end col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-5 lg:col-start-3">
            {/* <!-- Card --> */}
            <div
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src="https://www.eventbookings.com/wp-content/uploads/2023/02/Councils.png"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-semibold text-gray-50 rounded-lg p-4 md:text-3xl">
                  Councils
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="sm:self-end col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
            {/* <!-- Card --> */}
            <div
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src="https://www.eventbookings.com/wp-content/uploads/2023/02/Entertainment.png"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-semibold text-gray-50 rounded-lg p-4 md:text-3xl">
                  Entertainment
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="col-span-12 md:col-span-4">
            {/* <!-- Card --> */}
            <div
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src="https://www.eventbookings.com/wp-content/uploads/2023/02/Cultural.png"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-semibold text-gray-50 rounded-lg p-4 md:text-3xl">
                  Cultural
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            {/* <!-- Card --> */}
            <div
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src="https://www.eventbookings.com/wp-content/uploads/2023/02/Communities.png"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-semibold text-gray-50 rounded-lg p-4 md:text-3xl">
                  Communities
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            {/* <!-- Card --> */}
            <div
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                <img
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                  src="https://www.eventbookings.com/wp-content/uploads/2023/02/Charities.png"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                <div className="text-sm font-semibold text-gray-50 rounded-lg p-4 md:text-3xl">
                  Charity
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Masonry Cards --> */}
    </div>
  );
};

export default Masonry;
