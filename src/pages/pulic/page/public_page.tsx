import HomeNavbar from "pages/home/components/home_navbar.tsx";
import { Link, Outlet } from "react-router-dom";

const PublicPage = () => {
  return (
    <>
      <div className="sticky top-0 left-0">
        <HomeNavbar />
      </div>

      <header className={"w-full flex justify-center max-h-24  p-2"}>
        <a
          className="clogo"
          target="_blank"
          href="https://www.karnataka.gov.in"
        >
          <div className="flex gap-4">
            <img
              src="https://ksp.karnataka.gov.in/frontend/opt1/images/center_logo/kar_main_logo.png"
              alt="ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್"
              title="ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್"
              className="img-responsive size-20 cl img-fluid"
            />

            <div className="h-full self-center">
              <p className={"inline-block text-2xl md:text-3xl  font-semibold"}>
                Karnataka State Police
              </p>
              <p className="">Government of Karnataka</p>
            </div>
          </div>
        </a>
      </header>

      {/*	main content */}
      <div className={""}>
        <div
          className={
            "flex max-w-full overflow-x-scroll justify-center gap-8 text-white py-4 pl-4 bg-cyan-800"
          }
        >
          <Link to={"/public/PublicNoticeTable"}>Public Notices</Link>
          <Link to={"/public/PublicIncidentReporting"}>Report Incident</Link>
          <Link to={"/public/add-event"}>Event Permission</Link>
          <Link to={"/public/WantedList"}>Wanted List</Link>
          <Link to={"/public/PublicComplent"}>Complaint</Link>
          <Link to={"/public/PublicFedback"}>Feedback</Link>

        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default PublicPage;
