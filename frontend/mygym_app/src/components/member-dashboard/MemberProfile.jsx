import DonutCharts from "./DonutCharts";
import Shortcuts from "./Shortcuts";
import { User } from "./User";

const MemberProfile = () => {
  return <div className="px-2 py-4 mt-2 bg-gray-200 rounded-lg 
  w-full dark:bg-gray-700 lg:w-60 xl:w-80 flex flex-col justify-between
  gap-4">
    <User />
    <Shortcuts />
    <DonutCharts />
  </div>;
};

export default MemberProfile;
