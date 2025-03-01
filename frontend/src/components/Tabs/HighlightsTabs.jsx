import { PinIcon } from "lucide-react";
import StatCard from "../Ui/StatCard";
import Tabs from "./Tabs";
import CallToAction from "../Sections/CallToAction";
import yoga from "../../assets/yoga.svg";
import exploreSvg from "../../assets/explore.svg";
import online from "../../assets/online.svg";
import { useNavigate } from "react-router";
import { useJoinedEvent } from "../../hooks/useEvents";
import Card from "../Ui/Card";
import Table from "../Table/Table";

const HighlightsTabs = () => {
  const nav = useNavigate();
  const { data, isLoading } = useJoinedEvent();
  if (isLoading) return <span>Loading...</span>;
  const tabs = [
    {
      id: "hosted",
      label: "Hosted Events",
      content: (
        <div className="">
          {data.hosted.length === 0 ? (
            <div className="">
              <CallToAction
                title="Start selling tickets"
                para="Create your first event"
                img={yoga}
                action="Create Event"
                actionFunc={() => nav("/events/create")}
              />
            </div>
          ) : (
            <Table data={data.hosted} />
          )}
        </div>
      ),
      stat: data.hosted.length,
    },
    {
      id: "attended",
      label: "Attended Events",
      content: (
        <div className="">
          <h1 className="text-xl md:text-5xl font-bold mb-4">
            Attended Events
          </h1>
          {data.joined.length === 0 ? (
            <div className="">
              <CallToAction
                title="Explore Events"
                para="Book your seat now before they get sold out"
                img={exploreSvg}
                action="Explore Event"
                actionFunc={() => nav("/events")}
              />
            </div>
          ) : (
            <div className="flex-4">
              <div className="flex flex-row flex-wrap justify-start gap-10">
                {data &&
                  data.joined.map((event) => (
                    <Card
                      key={event.id}
                      link={`/events/${event.id}`}
                      title={event.title}
                      date={event.start_date}
                      duration={Math.floor(
                        (new Date(event.end_date) -
                          new Date(event.start_date)) /
                          (1000 * 60 * 60)
                      )}
                      location={event.location}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      ),
      stat: data.joined.length,
    },
    {
      id: "saved",
      label: "Saved Events",
      content: (
        <CallToAction
          title="Save Events"
          para="Save events so that we can suggest you similar events"
          img={online}
          action="Get Started"
          actionFunc={() => nav("/events")}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <PinIcon /> <span className="font-bold text-xl">Highlights</span>
        </div>
        <div className="flex flex-row overflow-x-scroll  md:flex-col gap-4">
          {tabs.map((tab) => (
            <StatCard
              key={tab.id}
              name={tab.label}
              stat={tab.stat}
              link={"#" + tab.id}
            />
          ))}
        </div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default HighlightsTabs;
