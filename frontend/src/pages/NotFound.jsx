import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto size-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <header className="mb-auto flex justify-center z-50 w-full py-4">
        <nav className="px-4 sm:px-6 lg:px-8">
          <Link to={"/"} className="font-bold text-2xl">
            Event<span className="text-rose-800">Pulse</span>
          </Link>
        </nav>
      </header>

      <main id="content">
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
            404
          </h1>
          <p className="mt-3 text-gray-600">Oops, something went wrong.</p>
          <p className="text-gray-600">Sorry, we couldn't find your page.</p>
          <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <Link
              className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-900 text-white hover:bg-caramel focus:outline-none focus:bg-caramel disabled:opacity-50 disabled:pointer-events-none"
              to="/"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto text-center py-5">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© All Rights Reserved. 2025.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
