import { useNavigate, useParams } from "react-router";
import Avatar from "../../components/Ui/Avatar";
import Button from "../../components/Ui/Button";
import LittleCalendar from "../../components/Ui/Calendar/LittleCalendar";
import { getDateInfo } from "../../utils";
import CountdownTimer from "../../components/Ui/CountdownTimer";
import { useAuth } from "../../hooks/auth";
import { useDeleteEvent, useEvent, useJoinEvent } from "../../hooks/useEvents";

const EventDetails = () => {
  const { eventId } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const { mutate: del } = useDeleteEvent();

  const { mutate, isPending } = useJoinEvent();

  const { data, isLoading } = useEvent(eventId);
  // Show a loading indicator while fetching the event.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const joinEvent = () => {
    if (data.participants !== data.max_participants && data.host.id !== user.id)
      mutate(eventId);
  };
  const deleteEvent = () => {
    if (data.host.id === user.id) {
      del(data.id);
      nav("/events");
    }
  };
  return (
    <>
      {/* Footer */}
      <div className="z-50 fixed w-full left-0 bg-gray-100 px-4 py-4 border-t border-t-gray-400 bottom-0 mt-6 flex flex-col md:flex-row justify-between items-center">
        {data.host.id !== user?.id && (
          <div className="flex flex-row gap-2 items-start">
            <Avatar name={data.host.name} />
            <div className="flex flex-col">
              <span className="text-sm text-gray-800">Organised by</span>
              <h1 className="font-semibold text-gray-900">{data.host.name}</h1>
            </div>
          </div>
        )}
        <div>
          {data.host.id === user?.id ? (
            <div className="flex flex-row gap-4 items-center">
              <Button
                onClick={() => nav(`/events/${data.id}/edit`)}
                type="button"
                className="w-full sm:w-auto"
              >
                Edit Event
              </Button>
              <Button
                onClick={deleteEvent}
                type="button"
                className="!bg-red-700 w-full sm:w-44"
              >
                Delete Event
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {!data.is_full ? (
                user ? (
                  !data.joined ? (
                    <Button
                      onClick={joinEvent}
                      disabled={isPending}
                      type="button"
                      className="w-full sm:w-auto"
                    >
                      {isPending ? "Loading..." : "Join Event"}
                    </Button>
                  ) : (
                    <span className="bg-white min-w-[165px] border text-caramel border-e-caramel font-bold py-3 px-6 text-center">
                      Already joined
                    </span>
                  )
                ) : (
                  <Button
                    onClick={() => nav("/login")}
                    type="button"
                    className="w-full sm:w-auto"
                  >
                    Join Event
                  </Button>
                )
              ) : (
                <span className="bg-white min-w-[165px] border text-red-900 border-e-red-800 font-bold py-3 px-6 text-center">
                  Event is Full
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Other stuff */}

      <div className="p-10 mb-11 w-full md:w-[90%] mx-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-6">
            <div className="hidden">
              <LittleCalendar date={new Date(data.start_date)} />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col">
                  <span className="text-xs text-blue-500 font-semibold">
                    Location
                  </span>
                  <span className="text-xs font-medium">{data.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-blue-500 font-semibold">
                    Date
                  </span>
                  <span className="text-xs font-medium">{data.start_date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-blue-500 font-semibold">
                    Time
                  </span>
                  <span className="text-xs font-medium">{data.start_date}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            Joined: <span className="font-semibold">{data.participants}</span> /{" "}
            <span className="text-gray-700">{data.max_participants}</span>
          </div>
        </div>
        <div className="mt-11">
          <img src={data.thumbnail_url} alt="" />
        </div>

        <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between mt-6 ">
          <div className="w-full pr-6">
            <div className="w-full h-0.5 bg-gray-400 my-4" />
            <h1 className="font-semibold text-gray-800 text-2xl">
              About This Event
            </h1>
            <p className="text-gray-800 text-sm mt-4">
              {data.description ? data.description : "No description provided."}
            </p>
          </div>
          <div className="flex flex-col text-center mb-6">
            <h1 className="font-bold">
              Booking will end on{" "}
              {getDateInfo(data.end_date).dayNumber +
                " " +
                getDateInfo(data.end_date).month}
            </h1>
            <span className="text-sm text-gray-600">
              Time left to book this event
            </span>
            <div className="mt-4">
              <CountdownTimer endDate={data.end_date} />
            </div>
            <div className="flex flex-col items-start px-4 mt-4">
              <h1 className="font-bold">Date & Time</h1>
              <span className="inline-flex justify-between flex-row w-full">
                Start Time
                <span className="text-gray-700">{data.start_date}</span>
              </span>
              <span className="inline-flex justify-between flex-row w-full">
                End Time<span className="text-gray-700">{data.end_date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
