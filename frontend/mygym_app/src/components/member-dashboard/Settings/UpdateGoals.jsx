import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/axiosInstance";
import { setGoals } from "../../../store/features/goalsSlice";

const UpdateGoals = () => {
  const [calorieGoal, setCalorieGoal] = useState("");
  const [dailyStepsGoal, setDailyStepsGoal] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");
  const [waterIntakeGoal, setWaterIntakeGoal] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    if (calorieGoal) payload.calorie_goal = calorieGoal;
    if (dailyStepsGoal) payload.daily_steps_goal = dailyStepsGoal;
    if (sleepGoal) payload.sleep_goal = sleepGoal;
    if (waterIntakeGoal) payload.water_intake_goal = waterIntakeGoal;

    if (Object.keys(payload).length === 0) {
      setMessage("Please fill out at least one field.");
      return;
    }

    try {
      const response = await api.post("/users/goals/", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        dispatch(setGoals(response.data));
        setMessage("Goals updated successfully!");
      }
    } catch (error) {
      console.error("Error updating goals:", error);
      setMessage("Failed to update goals.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
      <h2 className="text-xl font-bold mb-4">Update Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Calorie Goal
          </label>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter calorie goal"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Daily Steps Goal
          </label>
          <input
            type="number"
            value={dailyStepsGoal}
            onChange={(e) => setDailyStepsGoal(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter daily steps goal"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Sleep Goal (hours)
          </label>
          <input
            type="number"
            value={sleepGoal}
            onChange={(e) => setSleepGoal(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter sleep goal"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Water Intake Goal (liters)
          </label>
          <input
            type="number"
            value={waterIntakeGoal}
            onChange={(e) => setWaterIntakeGoal(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter water intake goal"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Save Goals
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

export default UpdateGoals;
