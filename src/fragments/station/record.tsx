import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Record = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-full h-12 bg-blue-300">
        <p className="p-3 font-semibold">Station Management</p>
      </div>

      <div className="p-6">
        <div className="shadow-md rounded-lg p-4 mx-auto mt-4 bg-white">
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

        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white ">
          <div className="grid grid-cols-7 gap-4">
            <div className="text-center">Name Of Officer (Post)</div>
            <div className="text-center">Patrolling Group Number</div>
            <div className="text-center">Patrolling In-charge</div>
            <div className="text-center">Vehicle Number</div>
            <div className="text-center">
              No of Officers and employees on patrolling
            </div>
            <div className="text-center">Out time</div>
            <div className="text-center">In time</div>
          </div>
        </div>
        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white ">
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

        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white ">
          <p className="mb-2">Miscellaneous Funds and System Maintenance</p>
        </div>

        <h1 className="mt-8">Vehicles</h1>
        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">Name Of Vehicle</div>
            <div className="text-center">Chassis number</div>
            <div className="text-center">Number plate</div>
            <div className="text-center">Type of vehicle</div>
            <div className="text-center">Servicing</div>
            <div className="text-center">Distance travelled</div>
          </div>
        </div>

        <h1 className="mt-8">Artillery & weapons</h1>
        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">Name Of weapon holder(Post)</div>
            <div className="text-center">Name of weapon</div>
            <div className="text-center">Type of weapon</div>
            <div className="text-center">Date of recently used</div>
            <div className="text-center">
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
        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white  h-80">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">Name of weapon</div>
            <div className="text-center">Type of weapon</div>
            <div className="text-center">Available In armory</div>
            <div className="text-center">Remaining ammo/ Magazine</div>
            <div className="text-center">
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
        <div className="border border-black rounded-lg p-4 mx-auto mt-4 bg-white ">
          <div className="grid grid-cols-7 gap-4">
            <div className="text-center">Name Of Vehicle</div>
            <div className="text-center">Chassis numberr</div>
            <div className="text-center">Number plate</div>
            <div className="text-center">Type of vehicle</div>
            <div className="text-center">Servicing</div>
            <div className="text-center">Distance travelled</div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Record;
