import { Calendar } from "antd";
import React from "react";

const CourtT: React.FC = () => {
  // Function to get color based on case status

  return (
    <div className="bg-gray-200">
      <div className="w-full h-12 bg-blue-300">
        <p className="p-3 font-semibold">Court Monitoring</p>
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 py-4 px-6">
        Witness Management
      </h1>
      <div className="flex bg-white rounded-lg p-5 space-x-5 h-48 mx-4">
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Witness Details</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Contact Information</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Statements</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Availability For Court</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 py-4 px-6">
        Calendar
      </h2>
      <div className="flex bg-white rounded-lg p-1 space-x-5 mx-5">
        {/* First box */}
        <div className="flex-1 bg-white rounded-lg p-1">
          <Calendar />
        </div>

        {/* Second box */}
        <div className="flex-1 bg-white rounded-lg p-5">
          <p className="text-gray-800 font-semibold">Appointments</p>
        </div>

        <div className="flex-1 bg-white rounded-lg p-5">
          <p className="text-gray-800 font-semibold">Court Details</p>
        </div>
      </div>
    </div>

  );
};

export default CourtT;
