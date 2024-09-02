import React from "react";
import userLogo from "../../assets/user01.png";
import { useSelector } from "react-redux";
export const User = () => {
  const username = useSelector((state) => state.auth.user.username);
  console.log(username)

  return (
    <div className="flex gap-3 items-center bg-white p-4 
    rounded-full dark:bg-gray-600 dark:text-gray-300">
      <img src={userLogo} alt="user image" className="w-14 h-14 rounded-full" />
      <div className="font-semibold text-2xl">
        <h3>{username}</h3>
        <p>Developer</p>
      </div>
    </div>
  );
};
