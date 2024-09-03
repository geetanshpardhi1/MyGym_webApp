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
      { path: "/member-dashboard", element: <MemberDashboard /> },
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
