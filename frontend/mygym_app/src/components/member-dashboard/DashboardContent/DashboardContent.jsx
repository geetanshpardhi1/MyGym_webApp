import React from "react";
import MemberContent from "../MemberContent";
import MemberStats from "../MemberStats";
import UpcomingWorkouts from "../UpcomingWorkout/UpcomingWorkouts";
import MemberProfile from "../MemberProfile";
import Team from "../TeamSection/Team";
import { useSelector } from "react-redux";

const DashboardContent = () => {
  const darkMode = useSelector((state) => state.darkMode.mode);
  return (
    <>
      <MemberContent>
        <MemberStats />

        <div className="flex flex-col gap-3 lg:flex-row">
          <Team />
          <UpcomingWorkouts />
        </div>
      </MemberContent>
      <MemberProfile />
    </>
  );
};

export default DashboardContent;
