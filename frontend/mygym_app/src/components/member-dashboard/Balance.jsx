import { FiSend } from "react-icons/fi";
import MemberTitle from "./MemberTitle";
import BarChart from "./BarChart";

const Balance = ({darkMode}) => {
  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1">
      <div className="flex justify-between items-center">
        <MemberTitle>Balance</MemberTitle>
        <FiSend className="bg-gray-500 rounded-full p-2 text-gray-300 w-8 h-8" />
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          $600,000<span className="font-medium text-xl">(USD)</span>
        </h1>
        <span>on August 2024</span>
      </div>
      <BarChart darkMode={darkMode}/>
    </div>
  );
};

export default Balance;
