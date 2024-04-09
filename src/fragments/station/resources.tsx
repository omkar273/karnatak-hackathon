const Resources = () => {
  return (
    <div>
      <div className="bg-gray-300 min-h-screen">
        <div className="w-full h-12 bg-blue-500"></div>
        <div className="w-full h-12 bg-blue-100">
          <p className="p-1">Court Monitoring </p>
        </div>
        <h1>Vehicles </h1>
        <div className="flex-1 bg-white  rounded-lg p-5 space-x-5 h-48 ">
          <div className="flex flex-row">
            <div className="flex-1 text-center">Name Of Vehicle</div>
            <div className="flex-1 text-center">Chassis number</div>
            <div className="flex-1 text-center">Number plate</div>
            <div className="flex-1 text-center">Type of vehicle</div>
            <div className="flex-1 text-center">Servicing</div>
            <div className="flex-1 text-center">Distance travelled</div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1">Mahindra Bolero B4 (Diesel)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
