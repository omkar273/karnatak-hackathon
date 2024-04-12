import React from "react";

const CourtTwo: React.FC = () => {
  // Function to get color based on case status
  // const getColorForCaseStatus = (caseStatus: string): string => {
  //   // Your logic to determine color based on case status
  //   switch (caseStatus) {
  //     case "Pending":
  //       return "yellow";
  //     case "Ongoing":
  //       return "green";
  //     case "Closed":
  //       return "blue";
  //     // Add more cases as needed
  //     default:
  //       return "gray";
  //   }
  // };

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-50">
        <div className="w-full h-12 bg-blue-500"></div>
        <div className="w-full h-12 bg-blue-100 flex items-center px-4">
          <p className="text-lg font-bold">Court Monitoring</p>
        </div>
        <h1 className="px-4 py-2 text-xl font-bold">Case Preparation</h1>

        <div className="flex bg-white rounded-lg p-5 space-x-5 mx-4 my-4">
          <p className="flex-1">Case Number</p>
          <p className="flex-1">Nature of Offence</p>
          <p className="flex-1">Evidence</p>
          <p className="flex-1">Officer In-charge</p>
          <p className="flex-1">Investigation Status</p>
        </div>

        <div className="flex space-x-5 mx-4">
          {/* First box */}
          <div className="flex-1 bg-white rounded-lg p-5">
            <p className="text-lg font-bold">Case Name (Number)</p>
          </div>
          <div className="flex-1 bg-white rounded-lg p-5 flex items-center justify-center">
            <p className="text-lg font-bold text-blue-500">Case Progress Meter</p>
          </div>
        </div>

        <div className="flex space-x-5 mx-4 my-4">
          {/* First box */}

          <div className="flex-1 bg-white rounded-lg p-5"></div>
        </div>
      </div>
    </div>

  );
};

export default CourtTwo;
