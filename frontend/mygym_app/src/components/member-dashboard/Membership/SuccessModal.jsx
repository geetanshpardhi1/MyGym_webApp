const SuccessModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded-2xl w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Success!</h2>
        <p className="text-center font-bold text-gray-500">You are now a member!</p>
        <button
          onClick={closeModal}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
