import React, { useState } from "react";
import axios from "axios";
import { useRazorpay } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { setMembershipDetails } from "../../../store/features/membershipSlice";

const MembershipPlanModal = ({ closeModal }) => {
  const { Razorpay } = useRazorpay();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [selectedDuration, setSelectedDuration] = useState({
    Base: "Monthly",
    Gold: "Quarterly",
    Premium: "Yearly",
  });

  const handleDurationChange = (plan, duration) => {
    setSelectedDuration((prevDurations) => ({
      ...prevDurations,
      [plan]: duration,
    }));
  };

  const amountMapping = {
    Base: {
      Monthly: 1000 * 100,    // Rs 1000 in paise
      Quarterly: 2500 * 100,  // Rs 2500 in paise
      Yearly: 8000 * 100,     // Rs 8000 in paise
    },
    Gold: {
      Monthly: 2000 * 100,    // Rs 2000 in paise
      Quarterly: 5000 * 100,  // Rs 5000 in paise
      Yearly: 15000 * 100,    // Rs 15000 in paise
    },
    Premium: {
      Monthly: 4000 * 100,    // Rs 4000 in paise
      Quarterly: 10000 * 100,  // Rs 10000 in paise
      Yearly: 30000 * 100,     // Rs 30000 in paise
    },
  };

  const completeOrder = (paymentID, orderID, signature, plan) => {
    const membershipPayload = {
      membership_type: plan,
      duration: selectedDuration[plan],
    };

    axios
      .post("http://127.0.0.1:8000/users/membership/create", membershipPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(setMembershipDetails(response.data));
        alert("Membership successfully created!");
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating membership: ", error);
      });
  };

  const handlePayment = (plan) => {
    const duration = selectedDuration[plan]; 
    const amount = amountMapping[plan][duration]; 

    axios
      .post("http://127.0.0.1:8000/users/order/create/", {
        amount: amount, // in paise
        currency: "INR",
      })
      .then((response) => {
        const { id: order_id } = response.data.data;

        const options = {
          key: "rzp_test_aRXVptfnhZtsWE",
          amount: amount,
          currency: "INR",
          name: "Acme Corp",
          description: `${plan} Membership Plan`,
          order_id: order_id,
          handler: (response) => {
            completeOrder(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
              plan
            );
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        console.error("Error creating order: ", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 dark:bg-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">Choose Your Membership Plan</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Base Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Base Plan</h3>
            <p>Price: Rs {amountMapping.Base[selectedDuration.Base] / 100}</p>
            <select
              value={selectedDuration.Base}
              onChange={(e) => handleDurationChange("Base", e.target.value)}
              className="mt-2 border p-2 rounded-md"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => handlePayment("Base")}
            >
              Buy Now
            </button>
          </div>

          {/* Gold Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Gold Plan</h3>
            <p>Price: Rs {amountMapping.Gold[selectedDuration.Gold] / 100}</p>
            <select
              value={selectedDuration.Gold}
              onChange={(e) => handleDurationChange("Gold", e.target.value)}
              className="mt-2 border p-2 rounded-md"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => handlePayment("Gold")}
            >
              Buy Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border p-4 rounded-md text-center dark:border-gray-600">
            <h3 className="text-lg font-bold">Premium Plan</h3>
            <p>Price: Rs {amountMapping.Premium[selectedDuration.Premium] / 100}</p>
            <select
              value={selectedDuration.Premium}
              onChange={(e) => handleDurationChange("Premium", e.target.value)}
              className="mt-2 border p-2 rounded-md"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => handlePayment("Premium")}
            >
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
