import React from "react";

const Offer = () => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-green-400">Congratulations! 🎉</h3>
      <p className="text-gray-300 mt-2">
        You have unlocked an exclusive gym offer!
      </p>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-lg font-semibold text-white">🔥 50% Off Gym Membership</h4>
        <p className="text-gray-400 mt-1">Use code: <span className="text-yellow-300 font-bold">FIT50</span></p>
        <p className="text-gray-500 text-sm mt-1">Offer valid for a limited time.</p>
      </div>
    </div>
  );
};

export default Offer;
