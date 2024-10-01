import React from "react";

const Item = ({ event }) => {
  return (
    <div className="flex gap-5 items-center">
      <span
        className="flex items-center justify-center bg-gray-300 text-gray-700 p-2 rounded-lg
        h-16 w-16 font-bold text-center"
      >
        {event.day}
      </span>
      <div >
        <h1 className="text-xl font-bold">{event.title.toUpperCase()}</h1>
        <p className="text-gray-400">{event.description}</p>
        <p className="text-gray-400"><strong>Intensity</strong> : {event.intensity}</p>
      </div>
    </div>
  );
};

export default Item;
