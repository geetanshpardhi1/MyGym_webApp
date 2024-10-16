import { useState } from "react";
import { useSelector } from "react-redux";
import MembershipPlanModal from "./MembershipPlanModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

const MembershipCard = () => {
  const membership = useSelector((state) => state.membership.membershipData);
  const [showModal, setShowModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-lg max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Membership Details</h2>

      {membership?.membership_status === "Not A Member" ? (
        <div className="text-center">
          <p className="mb-4 text-lg">You are currently not a member.</p>
          <button
            onClick={handlePurchaseClick}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-md"
          >
            Purchase Membership
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Membership Type:</span>{" "}
            {membership?.membership_type}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Duration:</span>{" "}
            {membership?.duration}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Days Left:</span>{" "}
            {membership?.days_left}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            {membership?.membership_status}
          </p>

          {membership?.days_left === 0 ? (
            <div className="text-center">
              <p className="text-red-500 font-bold text-lg">Membership Expired</p>
              <button
                onClick={handlePurchaseClick}
                className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-md"
              >
                Renew Membership
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <MembershipPlanModal
          closeModal={closeModal}
          setShowErrorModal={setShowErrorModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
      {showSuccessModal && (
        <SuccessModal closeModal={handleCloseSuccessModal} />
      )}
      {showErrorModal && <ErrorModal closeModal={handleCloseErrorModal} />}
    </div>
  );
};

export default MembershipCard;
