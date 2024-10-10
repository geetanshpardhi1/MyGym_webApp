import { IoIosArrowForward } from "react-icons/io";
import MemberTitle from "./MemberTitle";
import { IoSettingsOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { Link } from "react-router-dom";

const Shortcuts = () => {
  return (
    <div
      className="flex gap-4 flex-col bg-white rounded-lg
    p-4 dark:bg-gray-600"
    >
      <MemberTitle>Shortcuts</MemberTitle>
      <div
        className="flex justify-between
        items-center cursor-pointer rounded-sm"
      >
        <div className="flex gap-4 items-center">
          <span
            className="bg-blue-100 p-2 rounded-full w-8 h-8
            flex items-center justify-center dark:bg-gray-800 
            dark:text-gray-300"
          >
            <GoGoal />
          </span>
          <h3 className="font-medium dark:text-gray-300">Goals</h3>
        </div>
        <span
          className="bg-gray-300 p-3 rounded-md dark:bg-gray-700 dark:text-gray-300 hover:mr-3 
          transition-all duration-500 "
        >
          <IoIosArrowForward />
        </span>
      </div>
      <div
        className="flex justify-between
        items-center cursor-pointer rounded-sm"
      >
        <div className="flex gap-4 items-center">
          <span
            className="bg-blue-100 p-2 rounded-full w-8 h-8
            flex items-center justify-center dark:bg-gray-800 
            dark:text-gray-300"
          >
            <GrPlan />
          </span>
          <h3 className="font-medium dark:text-gray-300">Plans</h3>
        </div>
        <span
          className="bg-gray-300 p-3 rounded-md dark:bg-gray-700 dark:text-gray-300 hover:mr-3 
          transition-all duration-500 "
        >
          <IoIosArrowForward />
        </span>
      </div>
      <div
        className="flex justify-between
        items-center cursor-pointer rounded-sm"
      >
        <div className="flex gap-4 items-center">
          <span
            className="bg-blue-100 p-2 rounded-full w-8 h-8
            flex items-center justify-center dark:bg-gray-800 
            dark:text-gray-300"
          >
            <IoSettingsOutline />
          </span>
          <h3 className="font-medium dark:text-gray-300">Settings</h3>
        </div>

        <Link to="/member-dashboard/settings" className="inline-block">
          <span
            className="bg-gray-300 p-3 rounded-md dark:bg-gray-700 dark:text-gray-300 hover:mr-3 
    transition-all duration-500 inline-flex items-center"
          >
            <IoIosArrowForward />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Shortcuts;
