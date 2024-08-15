import React from "react";
import { empolyeesData } from "../../constants";
import Card from "./Card";

const MemberStats = () => {
  return (
    <div
      className="flex flex-col md:flex-row gap-5 
    "
    >
      <div className="flex flex-col gap-4 h-full">
        {empolyeesData.map((data,index)=>(
            <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MemberStats;
