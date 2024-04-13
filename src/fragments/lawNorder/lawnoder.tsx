import { FC } from "react";

interface LawnoderProps {
  // Define props here
}

const Lawnoder: FC<LawnoderProps> = (
  {
    /* Destructure props here */
  }
) => {
  return (
    <div>
      <div className="w-full h-12 bg-blue-300">
        <p className="p-3 font-semibold">Law and Order</p>
      </div>
      <div className=" justify-center bg-gray-100 p-10 items-center">
        <div className="rounded-lg bg-white shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Incident Reporting</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">location</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">time</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">nature of the incident</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">involved parties</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">actions taken</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>

        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          Riot Management
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Locations of disturbances</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Crowd sizes (In number)</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Movement patterns</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Potential hotspots</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>

        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          Traffic Management
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold"> Traffic condition</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold"> Congestion levels</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Traffic incidents</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Road closures</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Construction zones</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>

        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          Crowd management
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold"> Crowd size</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Density</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Movement patterns</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Potential areas of concern</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>

        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          VIP security
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Name of VIP</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Personal details</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Contact information</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Travel itineraries</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Security preferences</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          Public Events
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Event Details</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Police forces Demand</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Events Purpose</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Location(Time)</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Permission (Approved/rejected)</p>
            </div>
          </div>
          {/* Add data rows here */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">-</p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
    </div>
  );
};

export default Lawnoder;
