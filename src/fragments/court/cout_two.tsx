import React from "react";

const CoutTwo: React.FC = () => {
  // Function to get color based on case status
  const getColorForCaseStatus = (caseStatus: string): string => {
    // Your logic to determine color based on case status
    switch (caseStatus) {
      case "Pending":
        return "yellow";
      case "Ongoing":
        return "green";
      case "Closed":
        return "blue";
      // Add more cases as needed
      default:
        return "gray";
    }
  };

  return (
    <div style={{ backgroundColor: "#BFBFBF" }}>
      <div className="w-full h-12 bg-blue-500"></div>
      <div className="w-full h-12 bg-blue-100">
        <p className="p-1">Court Monitoring </p>
      </div>
      <h1>Chargesheet </h1>

      <div className="flex bg-white rounded-lg p-5 space-x-5 h-48 mx-4">
        <p>Case Number</p>
        <p>Nature of Offence</p>
        <p>IPC Section</p>
        <p>Judge Name</p>
        <p>Case Status</p>
        <p>Next Date of Hearing</p>
      </div>

      <div className="flex #BFBFBF rounded-lg p-5">

        <div className="flex-1 #BFBFBF rounded-lg p-5">
          <p>Investigation stage</p>
        </div>
        <p></p>
        <div className="flex-1 #BFBFBF rounded-lg p-5"> In Hearing </div>
        <div className="flex-1 #BFBFBF rounded-lg p-5">In progress</div>
      </div>
    </div>
  );
};

export default CoutTwo;
