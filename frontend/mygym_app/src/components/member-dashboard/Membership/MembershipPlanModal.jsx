import React, { useState } from "react";
import axios from "axios";
import { useRazorpay } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { setMembershipDetails } from "../../../store/features/membershipSlice";

const MembershipPlanModal = ({
  closeModal,
  setShowErrorModal,
  setShowSuccessModal,
}) => {
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
      Monthly: 1000 * 100,
      Quarterly: 2500 * 100,
      Yearly: 8000 * 100,
    },
    Gold: {
      Monthly: 2000 * 100,
      Quarterly: 5000 * 100,
      Yearly: 15000 * 100,
    },
    Premium: {
      Monthly: 4000 * 100,
      Quarterly: 10000 * 100,
      Yearly: 30000 * 100,
    },
  };

  const completeOrder = (paymentID, orderID, signature, amount, plan) => {
    axios
      .post("http://13.200.155.3/users/order/complete/", {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: amount,
      })
      .then((response) => {
        console.log("Payment Successful: ", response.data);
        createMembership(plan);
        closeModal();
        setShowSuccessModal(true);
      })
      .catch((error) => {
        setShowErrorModal(true);
        console.error("Error completing payment: ", error.response.data);
      });
  };

  const createMembership = (plan) => {
    const membershipPayload = {
      membership_type: plan,
      duration: selectedDuration[plan],
    };

    axios
      .post("http://13.200.155.3/users/membership/create", membershipPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(setMembershipDetails(response.data));
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
      .post("http://13.200.155.3/users/order/create/", {
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
              amount,
              plan
            );
          },
          modal: {
            ondismiss: () => {
              closeModal();
              setShowErrorModal(true);
            },
          },
          prefill: {
            name: "Geetansh Pardhi",
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
        <h2 className="text-xl font-bold mb-4 text-center">
          Choose Your Membership Plan
        </h2>

        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={50}
          slidesPerView={1}
        >
          {/* Base Plan */}
          <SwiperSlide className="pb-10">
            <div className="border p-4 rounded-md text-center dark:border-gray-600">
              <h3 className="text-lg font-bold">Base Plan</h3>
              <p>Price: Rs {amountMapping.Base[selectedDuration.Base] / 100}</p>
              <select
                value={selectedDuration.Base}
                onChange={(e) => handleDurationChange("Base", e.target.value)}
                className="mt-2 border p-2 rounded-md dark:text-gray-700 font-semibold"
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
          </SwiperSlide>

          {/* Gold Plan */}
          <SwiperSlide>
            <div className="border p-4 rounded-md text-center dark:border-gray-600">
              <h3 className="text-lg font-bold">Gold Plan</h3>
              <p>Price: Rs {amountMapping.Gold[selectedDuration.Gold] / 100}</p>
              <select
                value={selectedDuration.Gold}
                onChange={(e) => handleDurationChange("Gold", e.target.value)}
                className="mt-2 border p-2 rounded-md dark:text-gray-700 font-semibold"
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
          </SwiperSlide>

          {/* Premium Plan */}
          <SwiperSlide>
            <div className="border p-4 rounded-md text-center dark:border-gray-600">
              <h3 className="text-lg font-bold">Premium Plan</h3>
              <p>
                Price: Rs{" "}
                {amountMapping.Premium[selectedDuration.Premium] / 100}
              </p>
              <select
                value={selectedDuration.Premium}
                onChange={(e) =>
                  handleDurationChange("Premium", e.target.value)
                }
                className="mt-2 border p-2 rounded-md dark:text-gray-700 font-semibold"
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
          </SwiperSlide>
        </Swiper>

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
