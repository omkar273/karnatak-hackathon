import React from "react";

const FirPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
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
      <div className="mx-4 h-10">
        <h1>Chargesheet </h1>
      </div>

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

export default FirPage;
