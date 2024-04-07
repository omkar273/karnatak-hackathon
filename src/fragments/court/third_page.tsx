import React from "react";
import Calendar from "react-calendar";

const CoutT: React.FC = () => {
  // Function to get color based on case status

  return (
    <div style={{ backgroundColor: "#BFBFBF" }}>
      <div className="w-full h-12 bg-blue-500"></div>
      <div className="w-full h-12 bg-blue-100">
        <p className="p-1">Court Monitoring </p>
      </div>
      <h1>Witness Management </h1>
      <div className="flex bg-white  rounded-lg p-5 space-x-5 h-48 mx-4">
        <p>Witness Details</p>
        <p>Contact Information</p>
        <p>Statements</p>
        <p>Availablity For Court</p>
      </div>
      Calender For( Upcoming Alarms)

      <div className="flex #BFBFBF rounded-lg p-5 space-x-5 h-55 mx-4">
        {/* First box */}
        <div className="flex-1 bg-white rounded-lg p-5">
          <Calendar />
        </div>

        {/* Second box */}
        <div className="flex-1 bg-white rounded-lg p-5">Appointments</div>

        <div className="flex-1 bg-white rounded-lg p-5">Court Details</div>
      </div>
    </div>
  );
};

export default CoutT;
