import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInSignUp from "./components/SignInSignUp.jsx";
import MemberDashboard from "./components/member-dashboard/MemberDashboard.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import PrivateRoutes from "./utils/ProtectedRoutes.jsx";
import DashboardContent from "./components/member-dashboard/DashboardContent/DashboardContent.jsx";
import Settings from "./components/member-dashboard/Settings/Settings.jsx";
import MembershipCard from "./components/member-dashboard/Membership/MembershipCard.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login-register", element: <SignInSignUp /> },
    ],
  },
  {
    path: "/member-dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/member-dashboard",
        element: <MemberDashboard />,
        children: [
          { path: "/member-dashboard/", element: <DashboardContent /> },
          { path: "/member-dashboard/settings", element: <Settings /> }, 
          { path: "/member-dashboard/membership", element: <MembershipCard /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
