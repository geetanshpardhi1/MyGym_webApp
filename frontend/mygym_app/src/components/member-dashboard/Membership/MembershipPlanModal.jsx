import React from "react";

const MembershipPlanModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 dark:bg-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">Choose Your Membership Plan</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Base Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Base Plan</h3>
            <p>Duration: Monthly</p>
            <p>Price: $10</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Buy Now
            </button>
          </div>

          {/* Gold Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Gold Plan</h3>
            <p>Duration: Quarterly</p>
            <p>Price: $25</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Buy Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Premium Plan</h3>
            <p>Duration: Yearly</p>
            <p>Price: $80</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Buy Now
            </button>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MembershipPlanModal;
