const Manpower = () => {
  return (
    <div className=" justify-center bg-gray-100 items-center p-8">
      <div className="rounded-lg bg-white shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Manpower Details</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <p className="font-bold">Name</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Rank</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Department</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Duty Schedule</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Any Special Skills</p>
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
        <h2 className="text-2xl font-bold mb-4">Skills and Training</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <p className="font-bold">Name (Rank)</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Training status</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">
              {" "}
              Track expiration dates for certifications
            </p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">New training opportunities</p>
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
        <h2 className="text-2xl font-bold mb-4">Forces Deployed:</h2>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <p className="font-bold">Name of Unit Deployed </p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Location (Unit deployed)</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold"> No of Employees deployed</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">No of Employees Reserved</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Shift</p>
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
        <h2 className="text-2xl font-bold mb-4">Moving Unit Response</h2>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <p className="font-bold">Names</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold">Designations</p>
          </div>
          <div className="col-span-1">
            <p className="font-bold"> Thumbnails representing each unit</p>
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
        </div>
      </div>

      <div className="bg-gray-100">
        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Status Indicator</h2>

          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Name of each unit</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">
                Current status of each unit (they are moving, idle, engaged in
                combat, or performing a specific action)
              </p>
            </div>
            <div className="col-span-1">
              <p className="font-bold"> Visual cues</p>
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
          </div>
        </div>

        <br />
        <div className="rounded-lg bg-white shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">
            Resources (Rapid action force)
          </h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Type of Force needed</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Nearby Force (Available)</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Current location of nearby force</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Time To reach the location</p>
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
          <h2 className="text-2xl font-bold mb-4">Fleet management</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Vehicle Unit</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">
                Current status of each Vehicle (active, idle )
              </p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Vehicle Occupied</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Time taken to reach the location</p>
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
          <h2 className="text-2xl font-bold mb-4">Serveillance page</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold"> GPS markers</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Route information</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Any critical alerts or notifications.</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Motion Detection Alert</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Visuals Of incident</p>
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
          <h2 className="text-2xl font-bold mb-4">Reporting</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Type of incident</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Unit that reported the incident</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Location</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Description of what happened</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Additional relevant details</p>
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
          <h2 className="text-2xl font-bold mb-4">Deployed Employees </h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1">
              <p className="font-bold">Unit name</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Total Number of members in unit</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Weapons wielded </p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Live Tracking of unit</p>
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
      </div>
    </div>
  );
};

export default Manpower;
