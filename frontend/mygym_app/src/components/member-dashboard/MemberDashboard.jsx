import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import "../../styles/member_dashboard.css";
import MemberDashboardHeader from "./MemberDashboardHeader";
import MemberDashboardSidebar from "./MemberDashboardSidebar";
import MemberDashboardMain from "./MemberDashboardMain";
import MemberContent from "./MemberContent";
import MemberProfile from "./MemberProfile";
import MemberStats from "./MemberStats";
import Team from "./TeamSection/Team";
import Events from "./UpcomingWorkout/Events";
import axios from "axios";
import { setWorkoutData } from "../../store/features/wotkoutdataSlice";
import UpcomingWorkouts from "./UpcomingWorkout/UpcomingWorkouts";

const MemberDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/workout-plans/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        dispatch(setWorkoutData(response.data));
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutData();
  }, [dispatch, accessToken]);

  return (
    <div className={`${darkMode && "dark"}  font-quickSand`}>
      <MemberDashboardHeader
        toggleDarkMode={toggleDarkMode}
        darkmode={darkMode}
        toggleSidebar={toggleSideBar}
      />
      <MemberDashboardSidebar isSidebarOpen={isSidebarOpen} />

      <MemberDashboardMain>
        <MemberContent>
          <MemberStats darkMode={darkMode} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <Team />
            <UpcomingWorkouts />
          </div>
        </MemberContent>

        <MemberProfile />
      </MemberDashboardMain>
    </div>
  );
};

export default MemberDashboard;
