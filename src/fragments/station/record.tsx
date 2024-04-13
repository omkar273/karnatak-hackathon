import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Record = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full h-12 bg-blue-300">
        <p className="p-3 font-semibold">Station Management</p>
      </div>

      <div className="p-6">
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white">
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center font-bold">Name Of Officer (Post)</div>
            <div className="text-center font-bold">Finances </div>
            <div className="text-center font-bold">Track record</div>
            <div className="text-center font-bold">FIR/Case Number</div>
            <div className="text-center font-bold">Entry and Exit</div>
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

        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
          <div className="grid grid-cols-7 gap-4">
            <div className="text-center font-bold">Name Of Officer (Post)</div>
            <div className="text-center font-bold">Patrolling Group Number</div>
            <div className="text-center font-bold">Patrolling In-charge</div>
            <div className="text-center font-bold">Vehicle Number</div>
            <div className="text-center font-bold">
              No of Officers and employees on patrolling
            </div>
            <div className="text-center font-bold">Out time</div>
            <div className="text-center font-bold">In time</div>
          </div>
        </div>
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center font-bold">Budget Reports</div>
            <div className="text-center font-bold">2020-21</div>
            <div className="text-center font-bold">2019-20</div>
            <div className="text-center font-bold">2020-21</div>
            <div className="text-center font-bold">2019-20</div>
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

        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
          <p className="mb-2 font-bold">
            Miscellaneous Funds and System Maintenance
          </p>
        </div>

        <h1 className="mt-8 font-bold">Vehicles</h1>
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center font-bold">Name Of Vehicle</div>
            <div className="text-center font-bold">Chassis number</div>
            <div className="text-center font-bold">Number plate</div>
            <div className="text-center font-bold">Type of vehicle</div>
            <div className="text-center font-bold">Servicing</div>
            <div className="text-center font-bold">Distance travelled</div>
          </div>
        </div>

        <h1 className="mt-8 font-bold">Artillery & weapons</h1>
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center font-bold">
              Name Of weapon holder(Post)
            </div>
            <div className="text-center font-bold">Name of weapon</div>
            <div className="text-center font-bold">Type of weapon</div>
            <div className="text-center font-bold">Date of recently used</div>
            <div className="text-center font-bold">
              Details about weapon & Performance
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Colt 1911</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Glock 42</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Pistol Auto 9mm 1A</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Glock 42</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Pistol Auto 9mm 1A</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
        </div>
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center font-bold">Name of weapon</div>
            <div className="text-center font-bold">Type of weapon</div>
            <div className="text-center font-bold">Available In armory</div>
            <div className="text-center font-bold">
              Remaining ammo/ Magazine
            </div>
            <div className="text-center font-bold">
              Testing & ServicingTesting & Servicing
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Colt 1911</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Glock 42</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Pistol Auto 9mm 1A</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Glock 42</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center"></div>
            <div className="text-center">Pistol Auto 9mm 1A</div>
            <div className="text-center">Pistol</div>
            <div className="text-center"></div>
            <div className="text-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-blue-500" />
            </div>
          </div>
        </div>
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white ">
          <div className="grid grid-cols-7 gap-4">
            <div className="text-center font-bold">Name Of Vehicle</div>
            <div className="text-center font-bold">Chassis numberr</div>
            <div className="text-center font-bold">Number plate</div>
            <div className="text-center font-bold">Type of vehicle</div>
            <div className="text-center font-bold">Servicing</div>
            <div className="text-center font-bold">Distance travelled</div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br/>
    </div>
  );
};

export default Record;
