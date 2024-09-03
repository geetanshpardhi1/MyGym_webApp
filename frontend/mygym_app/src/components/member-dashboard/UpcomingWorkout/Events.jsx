import React from "react";
import MemberTitle from "../MemberTitle";
import { events } from "../../../constants";
import Item from "./Item";

const Event = () => {
  return (
    <div
      className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col
  gap-5"
    >
      <MemberTitle>Events</MemberTitle>

      {events.map((event, index) => (
        <Item key={index} event={event} />
      ))}
    </div>
  );
};

export default Event;
