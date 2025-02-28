import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";
import Card from "../../components/Ui/Card";
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";

const ExploreEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const getEvents = async (search) => {
    const response = await axios.get(
      `/api/events?search=${encodeURIComponent(search)}`
    );

    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", searchTerm],
    queryFn: () => getEvents(searchTerm),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();

    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };
  if (error) return <div>{error.message}</div>;
  return (
    <div className="flex flex-col gap-8 items-start p-4">
      <form onSubmit={handleSearch} className="w-full">
        <label className="text-4xl font-bold" htmlFor="">
          Discover Events For All The
          <br /> Things You Love
        </label>
        <div className="w-full mt-6 flex flex-row items-center gap-4">
          <div className="w-[60%]">
            <Input
              name="search"
              withIcon={<SearchIcon />}
              placeholder="Search for events..."
            />
          </div>
          <Button
            type="submit"
            className={"h-10 flex items-center justify-center !bg-[#06353d]"}
          >
            Search
          </Button>
        </div>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center md:justify-start gap-10">
          {data &&
            data.data.map((event) => (
              <Card
                key={event.id}
                link={`/events/${event.id}`}
                title={event.title}
                date={event.start_date}
                duration={Math.floor(
                  (new Date(event.end_date) - new Date(event.start_date)) /
                    (1000 * 60 * 60)
                )}
                location={event.location}
                image={event.thumbnail_url}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;
