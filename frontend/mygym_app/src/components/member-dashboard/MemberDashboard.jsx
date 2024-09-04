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
import axios from "axios";
import { setWorkoutData } from "../../store/features/wotkoutdataSlice";
import UpcomingWorkouts from "./UpcomingWorkout/UpcomingWorkouts";
import { setMembershipDetails } from "../../store/features/membershipSlice";
import Loading from "../Loading";
import { setGoals } from "../../store/features/goalsSlice";

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

  //fucntion to fetch workout plans from backend and set it to state
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

  //function to fetch membership details and set it to redux state
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/membership/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        dispatch(setMembershipDetails(response.data));
      } catch (error) {
        console.error("Error fetching membership details:", error);
      }
    };

    fetchMembershipData();
  }, [dispatch, accessToken]);

  //function to fetch goals of user and set it to redux state
  useEffect(() => {
    const fetchGoalsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/goals/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data)
        dispatch(setGoals(response.data));
      } catch (error) {
        console.error("Error fetching membership details:", error);
      }
    };

    fetchGoalsData();
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
