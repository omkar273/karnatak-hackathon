import React from "react";

const FirPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#BFBFBF" }}>
      <div className="w-full h-12 bg-blue-500"></div>
      <div className="w-full h-12 bg-blue-100">
        <p className="p-1">Court Monitoring </p>
      </div>
      <h1>Chargesheet </h1>

      <div className="flex bg-white rounded-lg p-5 space-x-5 h-48 mx-4">
        <p>Name of accused(Age)</p>
        <p>Nature of offence</p>
        <p>Evidence</p>
        <p>Officer In-charge</p>
        <p>Investigation status</p>
      </div>
      <div>
        <div className="flex #BFBFBF rounded-lg space-x-5">
          {/* First box */}

          <div className="flex-1 #BFBFBF rounded-lg p-5">
            <p>Case Name (Number)</p>
          </div>
          <p></p>
          {/* Second box */}
          <div className="flex-1 #BFBFBF rounded-lg p-5">
            Case Progress meter
          </div>
        </div>
      </div>

      <div className="flex #BFBFBF rounded-lg p-5 space-x-5 h-48 mx-4">
        {/* First box */}

        <div className="flex-1 bg-white rounded-lg p-5">
          <p>Case Name (Number)</p>
        </div>
        <p></p>
        {/* Second box */}
        <div className="flex-1 bg-white rounded-lg p-5"></div>
      </div>
      

      {/* Add your content here */}
    </div>
  );
};

export default FirPage;
