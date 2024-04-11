import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Record = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
  <div className="w-full h-12 bg-blue-100 flex justify-center items-center">
    <h1 className="text-lg font-semibold">Station Management</h1>
  </div>

  <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white max-w-3xl">
    <div className="grid grid-cols-5 gap-4">
      <div className="text-center">Name Of Officer (Post)</div>
      <div className="text-center">Finances</div>
      <div className="text-center">Track record</div>
      <div className="text-center">FIR/Case Number</div>
      <div className="text-center">Entry and Exit</div>
    </div>

    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2"></div>
      <div className="col-span-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white max-w-3xl">
    <div className="grid grid-cols-7 gap-4">
      <div className="text-center">Name Of Officer (Post)</div>
      <div className="text-center">Patrolling Group Number</div>
      <div className="text-center">Patrolling In-charge</div>
      <div className="text-center">Vehicle Number</div>
      <div className="text-center">No of Officers and employees on patrolling</div>
      <div className="text-center">Out time</div>
      <div className="text-center">In time</div>
    </div>
  </div>
  <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white max-w-3xl">
    <div className="grid grid-cols-5 gap-4">
      <div className="text-center">Budget Reports</div>
      <div className="text-center">2020-21</div>
      <div className="text-center">2019-20</div>
      <div className="text-center">2020-21</div>
      <div className="text-center">2019-20</div>
    </div>

    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="text-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white max-w-3xl">
    <p className="mb-2">Miscellaneous Funds and System Maintenance</p>
  </div>

  <h1 className="text-center mt-8">Vehicles</h1>
  <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white max-w-3xl h-80">
    <div className="grid grid-cols-6 gap-4">
      <div className="text-center">Name Of Vehicle</div>
      <div className="text-center">Chassis number</div>
      <div className="text-center">Number plate</div>
      <div className="text-center">Type of vehicle</div>
      <div className="text-center">Servicing</div>
      <div className="text-center">Distance travelled</div>
    </div>
  </div>
</div>

  );
};

export default Record;
