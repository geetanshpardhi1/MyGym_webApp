import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/axiosInstance";
import { setWorkoutData } from "../../../store/features/wotkoutdataSlice";

const UpdateWorkoutPlans = () => {
  const dispatch = useDispatch();
  const workoutData = useSelector((state) => state.workout.workoutData);


  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [intensity, setIntensity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const currentWorkout = workoutData.find(
      (workout) => workout.day_of_week === selectedDay
    );
    if (currentWorkout) {
      setDuration(currentWorkout.duration);
      setTitle(currentWorkout.title);
      setDescription(currentWorkout.description);
      setIntensity(currentWorkout.intensity);
    } else {
      setDuration("");
      setTitle("");
      setIntensity("");
    }
  }, [selectedDay, workoutData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      day_of_week: selectedDay,
      duration,
      title,
      description,
      intensity,
    };

    try {
      const response = await api.post("users/workout-plans/", payload);
      if (response.status === 200) {
        dispatch(setWorkoutData(response.data));
        setMessage("Workout updated successfully!");
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      setMessage("Failed to update workout.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
      <h2 className="text-xl font-bold mb-4">Update Workout Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Select Day of the Week
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Duration
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter duration (in minutes)"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter workout title"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter workout description"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Intensity
          </label>
          <input
            type="text"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter workout intensity"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Update Workout
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateWorkoutPlans;
