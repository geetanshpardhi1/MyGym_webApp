import React from "react";
import UpdateProfile from "./UpdateProfile";
import UpdateWorkoutPlans from "./UpdateWorkoutPlan";
import UpdateGoals from "./UpdateGoals";
import MemberContent from "../MemberContent";

const Settings = () => {
  return (
    <>
      <MemberContent>
        <div className="flex flex-col gap-5">
          <UpdateProfile />
          <UpdateWorkoutPlans />
          <UpdateGoals />
        </div>
      </MemberContent>
      ;
    </>
  );
};

export default Settings;
