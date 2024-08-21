import { useState } from "react";
import "../../styles/member_dashboard.css";
import MemberDashboardHeader from "./MemberDashboardHeader";
import MemberDashboardSidebar from "./MemberDashboardSidebar";
import MemberDashboardMain from "./MemberDashboardMain";
import MemberContent from "./MemberContent";
import MemberProfile from "./MemberProfile";
import MemberStats from "./MemberStats";
import Team from "./TeamSection/Team";
import Event from "./EventsSection/Event";
const MemberDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            <Event />
          </div>
        </MemberContent>
        <MemberProfile />
      </MemberDashboardMain>
    </div>
  );
};

export default MemberDashboard;
