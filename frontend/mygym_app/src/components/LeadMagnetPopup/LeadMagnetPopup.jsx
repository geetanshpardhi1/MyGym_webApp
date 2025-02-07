import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Offer from "./Offer";

const LeadMagnetPopup = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", number: "" });
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === "popup-overlay") {
        onClose();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await fetch(
          "https://hook.us2.make.com/wik800d7j32ioykvt5blw4k7ehtfveiy",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } catch (error) {
        console.error("Error sending data:", error);
      }

      setIsLoading(false);
      setShowForm(false);
      setShowOffer(true);
    }, 2000);
  };

  return (
    <div
      id="popup-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-6 backdrop-blur-sm"
    >
      <div className="bg-black text-white rounded-lg p-6 max-w-lg w-full sm:max-w-[90%] sm:w-auto sm:p-4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-gray-300"
        >
          &times;
        </button>

        {showOffer ? (
          <Offer />
        ) : !showForm ? (
          <>
            <h3 className="text-xl font-bold text-center">
              Get Your Special Gym Offer Today!🔥
            </h3>
            <p className="text-gray-400 text-center mt-2">
              Enter your details to unlock exclusive gym discounts.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Get Offer
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-center">
              Enter Your Details
            </h3>
            <p className="text-gray-400 text-sm text-center">
              We will send your offer via email.
            </p>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="block text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-sky-300 focus:ring-1 focus:ring-sky-300"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-sky-300 focus:ring-1 focus:ring-sky-300"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-400">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="number"
                  placeholder="Your Phone Number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-sky-300 focus:ring-1 focus:ring-sky-300"
                />
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                  <Loading />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Submit & Reveal Offer
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetPopup;
