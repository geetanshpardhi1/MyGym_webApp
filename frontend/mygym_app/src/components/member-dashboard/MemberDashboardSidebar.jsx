import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/features/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { clearMembershipDetails } from "../../store/features/membershipSlice";
import { clearWorkoutData } from "../../store/features/workoutdataSlice";
import { clearGoals } from "../../store/features/goalsSlice";


const MemberDashboardSidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearMembershipDetails());
    dispatch(clearWorkoutData());
    dispatch(clearGoals());
    navigate("/");
  };


  return (
    <aside
      className={`fixed top-0 left-0 z-40 
        w-64 h-screen pt-20 bg-white border-r border-gray-200 
        sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700
        transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li className="cursor-pointer">
            <Link
            to="/member-dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
      hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <CiCalendar className="mr-2" />
              <span className="flex-1 me-3 ">Dashboard</span>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
            to="/member-dashboard/settings"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
      hover:bg-gray-200 dark:hover:bg-gray-700"
      
            >
              <IoSettingsOutline className="mr-2" />
              <span className="flex-1 me-3 ">Settings</span>
            </Link>
          </li>
          <li className="cursor-pointer">
            <a
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
      hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IoIosLogOut className="mr-2" />
              <span className="flex-1 me-3 ">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default MemberDashboardSidebar;
