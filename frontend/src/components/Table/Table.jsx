import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Table = ({ data }) => {
  return (
    <>
      {/* <!-- Table Section --> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* <!-- Header --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Hosted Events
                    </h2>
                    <p className="text-sm text-gray-600">
                      Events hosted by you.
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <Link
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        to="/events/create"
                      >
                        <PlusIcon size={14} />
                        Create
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Table --> */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 divide-y divide-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start border-s border-gray-200"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Event
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Attendees
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Starting Date
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          End Date
                        </span>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                          Duration
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {data.map((event) => (
                      <tr key={event.id}>
                        <td className="h-px w-auto whitespace-nowrap">
                          <div className="px-6 py-2 flex items-center gap-x-3">
                            <span className="text-sm text-gray-600">1.</span>
                            <Link
                              to={`/events/${event.id}`}
                              className="flex items-center gap-x-2"
                              href="#"
                            >
                              <span className="text-sm text-blue-600 decoration-2 hover:underline">
                                {event.title}
                              </span>
                            </Link>
                          </div>
                        </td>
                        <td className="h-px w-auto whitespace-nowrap">
                          <div className="px-6 py-2">
                            <span className="font-semibold text-sm text-gray-800">
                              {event.participants} / {event.max_participants}
                            </span>
                            <span className="text-xs text-gray-500">
                              (
                              {(
                                (event.participants / event.max_participants) *
                                100
                              ).toFixed(2)}
                              %)
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-auto whitespace-nowrap">
                          <div className="px-6 py-2">
                            <span className="text-sm text-gray-800">
                              {event.start_date}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-auto whitespace-nowrap">
                          <div className="px-6 py-2">
                            <span className="text-sm text-gray-800">
                              {event.end_date}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-auto whitespace-nowrap">
                          <div className="px-6 py-2">
                            <span className="text-sm text-gray-800">
                              {Math.floor(
                                (new Date(event.end_date) -
                                  new Date(event.start_date)) /
                                  (1000 * 60 * 60)
                              )}
                              h
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">
                        {data.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Table Section --> */}
    </>
  );
};

export default Table;
