import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInSignUp from "./components/SignInSignUp.jsx";
import MemberDashboardSidebar from "./components/member-dashboard/MemberDashboardSidebar.jsx";
import MemberDashboard from "./components/member-dashboard/MemberDashboard.jsx";

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
    element: <MemberDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
