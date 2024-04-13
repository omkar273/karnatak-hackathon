import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reports = () => {
  return (
    <div className="#f0f0f0 min-h-screen">
      <div className="w-full h-12 bg-blue-100">
        Station Management
        <p className="p-1"> </p>
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
      <div className="border  border-black rounded-lg p-1 w-90 mx-auto mt-2 bg-white h-80">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center"></div>
          <div className="flex-1 text-center"></div>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default Reports;
