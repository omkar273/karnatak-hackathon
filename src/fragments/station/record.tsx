import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Record = () => {
  return (
    <div className="#f0f0f0 min-h-screen">
      <div className="w-full h-12 bg-blue-100">
        Station Management
        <p className="p-1"> </p>
      </div>
      Station Records
      <div className="border  border-black rounded-lg p-1 w-90 mx-auto mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">Name Of Officer (Post)</div>
          <div className="flex-1 text-center">Finances</div>
          <div className="flex-1 text-center">Track record</div>
          <div className="flex-1 text-center">FIR/Case Number</div>
          <div className="flex-1 text-center">Entry and Exit</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center"></div>
        </div>
      </div>
      Patrolling Records
      <div className="border  border-black rounded-lg p-1 w-90 mx-auto mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">Name Of Officer (Post)</div>
          <div className="flex-1 text-center">Patrolling Group Number</div>
          <div className="flex-1 text-center">Patrolling In-charge</div>
          <div className="flex-1 text-center">Vehicle Number</div>
          <div className="flex-1 text-center">
            No of Officers and employees on patrollling
          </div>
          <div className="flex-1 text-center">Out time</div>
          <div className="flex-1 text-center">In time</div>
        </div>
      </div>
      Annual Budget reports
      <div className="border  border-black rounded-lg p-1 w-90 mx-auto mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">Budget Reports</div>
          <div className="flex-1 text-center">2020-21</div>
          <div className="flex-1 text-center">2019-20</div>
          <div className="flex-1 text-center">2020-21</div>
          <div className="flex-1 text-center">2019-20</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
          <div className="flex-1 text-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="pdf-icon m-1">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
            ))}
          </div>
        </div>
        Miscellaneous Funds and System Maintainance
      </div>
      <h1>Vehicles </h1>
      <div className="border  border-black rounded-lg p-1 w-90 mx-auto mt-2 bg-white h-80">
        <div className="flex-1 justify-between items-center">
          <div className="flex flex-row">
            <div className="flex-1 text-center">Name Of Vehicle</div>
            <div className="flex-1 text-center">Chassis number</div>
            <div className="flex-1 text-center">Number plate</div>
            <div className="flex-1 text-center">Type of vehicle</div>
            <div className="flex-1 text-center">Servicing</div>
            <div className="flex-1 text-center">Distance travelled</div>
          </div>
          <br></br>
          <div className="flex flex-row">
            <div className="flex-1">Mahindra Bolero B4 (Diesel)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
