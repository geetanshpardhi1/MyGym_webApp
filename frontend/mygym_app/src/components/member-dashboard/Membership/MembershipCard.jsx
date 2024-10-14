import { useState } from "react";
import { useSelector } from "react-redux";
import MembershipPlanModal from "./MembershipPlanModal";

const MembershipCard = () => {
  const membership = useSelector((state) => state.membership.membershipData);
  const [showModal, setShowModal] = useState(false);

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
      <h2 className="text-xl font-bold mb-4">Membership Details</h2>

      {membership?.membership_status === "Not A Member" ? (
        <div className="text-center">
          <p className="mb-4">You are currently not a member.</p>
          <button
            onClick={handlePurchaseClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Purchase Membership
          </button>
        </div>
      ) : (
        <div>
          <p>Membership Type: {membership?.membership_type}</p>
          <p>Duration: {membership?.duration}</p>
          <p>Days Left: {membership?.days_left}</p>
          <p>Status: {membership?.membership_status}</p>
        </div>
      )}

      {showModal && <MembershipPlanModal closeModal={closeModal} />}
    </div>
  );
};

export default MembershipCard;
