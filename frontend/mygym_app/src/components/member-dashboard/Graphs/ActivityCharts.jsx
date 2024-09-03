import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const ActivityGraph = ({ darkMode }) => {
  const [exerciseData, setExerciseData] = useState(Array(7).fill(0));
  const [restData, setRestData] = useState(Array(7).fill(24));

  const workoutData = useSelector((state) => state.workout.workoutData);

  useEffect(() => {
    if (workoutData && workoutData.length > 0) {
      const exerciseHours = Array(7).fill(0);
      const restHours = Array(7).fill(24);
      const daysMap = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6,
      };

      workoutData.forEach((plan) => {
        const dayIndex = daysMap[plan.day_of_week];
        if (dayIndex !== undefined) {
          exerciseHours[dayIndex] = plan.duration;
          restHours[dayIndex] = 24 - plan.duration;
        }
      });

      setExerciseData(exerciseHours);
      setRestData(restHours);
    }
  }, [workoutData]);

  const totalExercise = exerciseData.reduce((acc, curr) => acc + curr, 0);
  const totalRest = restData.reduce((acc, curr) => acc + curr, 0);

  const series = [
    {
      name: "Exercise",
      data: exerciseData,
    },
    {
      name: "Rest",
      data: restData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: darkMode ? "#374151" : "#fff",
      foreColor: darkMode ? "#e5e7eb" : "#000",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      title: {
        text: "Hours",
      },
      max: 24,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Hours`,
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1">
      <div>
        <h1 className="font-bold text-2xl">Activity Summary</h1>
        <span>for the week</span>
      </div>
      
      {/* Display Total Hours for Exercise and Rest */}
      <div className="my-4 text-lg font-semibold">
        <p>Total Exercise: {totalExercise} hrs</p>
        <p>Total Rest: {totalRest} hrs</p>
      </div>

      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ActivityGraph;
