import { useState } from "react";
import "../../styles/member_dashboard.css";
import MemberDashboardHeader from "./MemberDashboardHeader";
import MemberDashboardSidebar from "./MemberDashboardSidebar";
import MemberDashboardMain from "./MemberDashboardMain";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkModeAction } from "../../store/features/darkModeSlice";

const MemberDashboard = () => {
  const darkMode = useSelector((state) => state.darkMode.mode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(toggleDarkModeAction());
  };

  const toggleSideBar = () => {
    console.log('helo')
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`${darkMode && "dark"}  font-quickSand`}>
      <MemberDashboardHeader
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={toggleSideBar}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}
      <MemberDashboardSidebar
        toggleSideBar={toggleSideBar}
        isSidebarOpen={isSidebarOpen}
      />

      <MemberDashboardMain>
        <Outlet />
      </MemberDashboardMain>
    </div>
  );
};

export default MemberDashboard;
