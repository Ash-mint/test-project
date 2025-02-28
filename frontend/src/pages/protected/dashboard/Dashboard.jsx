import Avatar from "../../../components/Ui/Avatar";
import { useAuth } from "../../../hooks/auth";
import HighlightsTabs from "../../../components/Tabs/HighlightsTabs";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="h-[30vh] bg-emerald-200 w-full relative px-8">
        <div className="flex flex-col-reverse mx-auto md:flex-row gap-6 absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-11 md:-translate-x-0">
          <Avatar size="big" name={user.name} />
          <div className="flex flex-col gap-4 text-center">
            <span className="font-normal text-xs text-gray-800">
              Memeber since 2025
            </span>
            <h1 className="font-bold text-2xl md:text-5xl">{user.name}</h1>
          </div>
        </div>
      </div>
      <div className="mt-22 px-6">
        <div className="">
          <HighlightsTabs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
