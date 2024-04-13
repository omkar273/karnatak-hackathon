import React from "react";

const FirPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-full h-12 shadow-md bg-blue-300">
        <p className="p-3 font-semibold shadow-md">Court Monitoring</p>
      </div>
      <h1> </h1>
      <h1 className="text-3xl font-semibold text-gray-800 py-4 px-6">
        Chargesheet
      </h1>
      <div className="shadow-md flex bg-white rounded-lg p-5 space-x-5 h-48 mx-4">
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Name of accused(Age)</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Nature of offence</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Evidence</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Officer In-charge</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Investigation status</p>
        </div>
      </div>
      <div>
        <div className="flex #BFBFBF rounded-lg space-x-5">
          {/* First box */}

          <div className="flex-1 #BFBFBF rounded-lg p-5 ">
            <p>Case Name (Number)</p>
          </div>
          <p></p>
          {/* Second box */}
          <div className="flex-1 #BFBFBF rounded-lg p-5">
            Case Progress meter
          </div>
        </div>
      </div>

      <div className="  flex #BFBFBF rounded-lg p-5 space-x-5 h-48 mx-4">
        {/* First box */}

        <div className="flex-1 shadow-md bg-white rounded-lg p-5 font-semibold">
          <p>Case Name (Number)</p>
        </div>
        <p></p>
        {/* Second box */}
        <div className="flex-1 shadow-md bg-white rounded-lg p-5"></div>
      </div>

      {/* Add your content here */}
      <div className="mx-4 h-10">
        <h1>Chargesheet </h1>
      </div>
      <div className="flex shadow-md bg-white rounded-lg p-5 space-x-5 h-48 mx-4">
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Case Number</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Nature of Offence</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">IPC Section</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Judge Name</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Case Status</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">Case Status</p>
        </div>
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
