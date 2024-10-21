import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{errorMessage}</strong>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
