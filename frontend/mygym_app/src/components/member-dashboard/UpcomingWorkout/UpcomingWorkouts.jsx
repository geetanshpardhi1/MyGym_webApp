import React from "react";
import MemberTitle from "../MemberTitle";
import { useSelector } from "react-redux";
import Item from "./Item";
import Loading from "../../Loading";

const UpcomingWorkouts = () => {
  const workoutData = useSelector((state) => state.workout.workoutData);

  if (!workoutData || workoutData.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
        <MemberTitle>Upcoming Workouts</MemberTitle>
        <div className="flex flex-row items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  const getDayIndex = (day) => {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return daysMap[day];
  };

  const todayIndex = new Date().getDay(); // Get today's index

  // Create an array for the next 3 upcoming days, considering the circular logic
  const nextDays = [];
  for (let i = 1; i <= 3; i++) {
    nextDays.push((todayIndex + i) % 7);
  }

  // Filter upcoming workouts based on the nextDays array
  const upcomingWorkouts = workoutData.filter((workout) => {
    const workoutIndex = getDayIndex(workout.day_of_week);
    return nextDays.includes(workoutIndex);
  });

  // Sort the upcoming workouts based on the day index, considering circular ordering
  upcomingWorkouts.sort((a, b) => {
    const indexA = getDayIndex(a.day_of_week);
    const indexB = getDayIndex(b.day_of_week);
    return (indexA - todayIndex + 7) % 7 - (indexB - todayIndex + 7) % 7;
  });

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
      <MemberTitle>Upcoming Workouts</MemberTitle>

      {upcomingWorkouts.length > 0 ? (
        upcomingWorkouts.map((workout, index) => (
          <Item
            key={index}
            event={{
              day: workout.day_of_week.slice(0, 3).toUpperCase(),
              title: workout.title,
              description: workout.description || "No description available",
              intensity: workout.intensity || "Not Set",
            }}
          />
        ))
      ) : (
        <p>No upcoming workouts</p>
      )}
    </div>
  );
};

export default UpcomingWorkouts;
