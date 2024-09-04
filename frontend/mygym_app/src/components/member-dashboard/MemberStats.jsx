import React from "react";
import { FaFire } from "react-icons/fa6";
import { GiNightSleep } from "react-icons/gi";
import { GiRunningNinja } from "react-icons/gi";
import ActivityGraph from "./Graphs/ActivityCharts";
import { FaIdCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const MemberStats = ({ darkMode }) => {
  const membershipData = useSelector(
    (state) => state.membership.membershipData
  );
  const goalsData = useSelector((state) => state.goals.goalsData);

  return (
    <div
      className="flex flex-col md:flex-row gap-5 
    "
    >
      <div className="flex flex-col gap-5 h-full">
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-red-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
          >
            <FaFire />
          </span>
          <div>
            {goalsData ? (
              <>
                <h2 className="text-xl">
                  <span className="text-2xl font-bold">
                    {goalsData.calorie_goal}
                  </span>
                </h2>
                <p className="font-bold">Calorie Budget</p>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-blue-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
          >
            <GiRunningNinja />
          </span>
          <div>
            {goalsData ? (
              <>
                <h2 className="text-xl">
                  <span className="text-2xl font-bold">
                    {goalsData.daily_steps_goal}
                  </span>
                </h2>
                <p className="font-bold">Daily Steps</p>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-violet-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
          >
            <GiNightSleep />
          </span>
          <div>
            {goalsData ? (
              <>
                <h2 className="text-xl">
                  <span className="text-2xl font-bold">
                    {goalsData.sleep_goal} Hours
                  </span>
                </h2>
                <p className="font-bold">Sleep Goal</p>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
          <span
            className={`bg-orange-300 px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}
          >
            <FaIdCard />
          </span>
          <div>
            {membershipData ? (
              <>
                <h2 className="text-xl">
                  <span className="text-2xl font-bold">
                    {membershipData.days_left} Days
                  </span>
                </h2>
                <p className="font-bold">Membership Left</p>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <ActivityGraph darkMode={darkMode} />
    </div>
  );
};

export default MemberStats;
