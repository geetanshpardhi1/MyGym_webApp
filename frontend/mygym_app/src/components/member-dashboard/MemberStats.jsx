import React from "react";
import { FaFire } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import ActivityGraph from "./Graphs/ActivityCharts";

const MemberStats = ({ darkMode }) => {
  return (
    <div
      className="flex flex-col md:flex-row gap-5 
    "
    >
      <div className="flex flex-col gap-5 h-full">
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-red-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500 `}
          >
            <FaFire />
          </span>
          <div>
            <h2 className="text-xl">
              <span className="text-2xl font-bold">2000</span>
            </h2>
            <p className="font-bold">Calorie Budget</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-violet-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500 `}
          >
            <GiNightSleep />
          </span>
          <div>
            <h2 className="text-xl">
              <span className="text-2xl font-bold">8 Hours</span>
            </h2>
            <p className="font-bold">Sleep Goal</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-blue-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500 `}
          >
            <GiRunningNinja />
          </span>
          <div>
            <h2 className="text-xl">
              <span className="text-2xl font-bold">8.0 KM</span>
            </h2>
            <p className="font-bold">Daily Steps</p>
          </div>
        </div>
        
      </div>
      <ActivityGraph darkMode={darkMode} />
    </div>
  );
};

export default MemberStats;
