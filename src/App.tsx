import StaffDistribution from "@/fragments/Manpower/pages/staff_distribution.tsx";
import LeaveApprovals from "@/fragments/applications/pages/leave_approvals.tsx";
import LeaveRequest from "@/fragments/applications/pages/leave_request.tsx";
import EmergencyZones from "@/fragments/emergency_zones/emergency_zones.tsx";
import ZoneDetails from "@/fragments/emergency_zones/zone_details.tsx";
import EventManagement from "@/fragments/event/pages/event_management.tsx";
import AddEventPage from "@/fragments/events/pages/add_event.tsx";
import AddFir from "@/fragments/fir/page/add_fir.tsx";
import IncidentReporting from "@/fragments/fir/page/incident_reporting.tsx";
import LawOrderPage from "@/fragments/law and order/pages/law_order_page.tsx";
import AddStationPage from "@/fragments/station/pages/add_station_page.tsx";
import VehicleDetails from "@/fragments/station/pages/vehicle_details.tsx";
import WeaponDetails from "@/fragments/station/pages/weapon_details.tsx";
import TaskDetails from "@/fragments/tasks/pages/task_details.tsx";
import TaskPage from "@/fragments/tasks/pages/task_page.tsx";
import "leaflet/dist/leaflet.css";
import AdminDashboardPage from "pages/admin/admin_dashboard_page.tsx";
import PublicPage from "pages/pulic/page/public_page.tsx";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import { setUserdata } from "./common/redux/auth_slice";
import { RootState } from "./common/redux/store";
import Forensic from "./fragments/Forensic/forensic";
import ManpowerPages from "./fragments/Manpower/pages/manpowe3";
import Manpower from "./fragments/Manpower/pages/manpower";
import ManpowerStatic from "./fragments/Manpower/pages/manpower2";
import VehiclePage from "./fragments/New/new";
import VehiclesPagess from "./fragments/New/vehicalsss.tsx";
import WeaponsPage from "./fragments/New/weapons.tsx";
import CourtTwo from "./fragments/court/cout_two";
import CourtMainPage from "./fragments/court/coutmain";
import ChargesheetPage from "./fragments/court/pages/chargesheet_page";
import CourtT from "./fragments/court/third_page";
import DashboardPage from "./fragments/dashboard/pages/dashboard_page";
import AllFirPage from "./fragments/fir/page/all_fir_page";
import FirDetailsPage from "./fragments/fir/page/fir_details_page";
import PublicIncidentReporting from "./fragments/fir/page/publicreport.tsx";
import WantedList from "./fragments/fir/page/wanted.tsx";
import LawOrderPagess from "./fragments/law and order/pages/lawandoderpage";
import CasePreparationTable from "./fragments/notice/caseprep";
import NoticeTable from "./fragments/notice/odernotice";
import PublicNoticeTable from "./fragments/notice/publicnotice.tsx";
import ProfilePage from "./fragments/profile/page/profile_page";
import MyStationPage from "./fragments/station/pages/my_station";
import AddTaskPage from "./fragments/tasks/pages/add_task_page.tsx";
import TasksPage from "./fragments/tasks/pages/tasknew";
import UnderlyingDataPage from "./fragments/underlying/page/underlying_page";
import RegisterFragment from "./fragments/user_management/register_page";
import WitnessManagementPages from "./fragments/witness management/pages/witness";
import WitnessManagementPage from "./fragments/witness management/pages/witness_management_page";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";
import VideoPage from "./pages/videos/page/video_page";

const App = () => {
  const { isUserLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const userData = useUserData(currentUser?.user.uid);

  dispatch(setUserdata(userData));

  const getProtectedRoute = (element: ReactNode) => {
    return isUserLoggedIn ? element : <Navigate to="/auth" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getProtectedRoute(<HomePage />)}>
          <Route index element={getProtectedRoute(<DashboardPage />)} />
          {/* fir route */}
          <Route path="fir">
            <Route index element={getProtectedRoute(<AddFir />)} />
            <Route path="all" element={getProtectedRoute(<AllFirPage />)} />
            <Route
              path="report-incident"
              element={getProtectedRoute(<IncidentReporting />)}
            />
            <Route
              path="details"
              element={getProtectedRoute(<FirDetailsPage />)}
            />
          </Route>
          {/* station routes */}
          <Route path="station">
            <Route index element={getProtectedRoute(<MyStationPage />)} />

            <Route path="task" element={getProtectedRoute(<TasksPage />)} />

            <Route path="vehicle" element={<VehiclePage />} />
            <Route path="weop" element={<WeaponsPage />} />
            <Route path="VehiclesPagess" element={<VehiclesPagess />} />

            <Route path="vehicle/details" element={<VehicleDetails />} />

            <Route path="weapon/details" element={<WeaponDetails />} />
          </Route>
          {/*admin paths*/}
          {/* admin route */}
          <Route path="/admin">
            <Route index element={<AdminDashboardPage />} />

            <Route
              path="add-user"
              element={getProtectedRoute(<RegisterFragment />)}
            />
            <Route
              path="add-station"
              element={getProtectedRoute(<AddStationPage />)}
            />
          </Route>
          {/*user route*/}
          <Route
            path="LawOrderPage"
            element={getProtectedRoute(<LawOrderPage />)}
          />
          <Route path="user">
            <Route
              path="register"
              element={getProtectedRoute(<RegisterFragment />)}
            />
            <Route
              path="underlyings"
              element={getProtectedRoute(<UnderlyingDataPage />)}
            />

            <Route
              path="underlying"
              element={getProtectedRoute(<UnderlyingDataPage />)}
            />
            <Route index element={getProtectedRoute(<ProfilePage />)} />
          </Route>
          {/*application route*/}
          <Route path="application">
            <Route
              path="leaves"
              element={getProtectedRoute(<LeaveRequest />)}
            />

            <Route index element={getProtectedRoute(<EventManagement />)} />

            <Route
              path={"events"}
              element={getProtectedRoute(<EventManagement />)}
            />

            <Route
              path={"leaves/manage"}
              element={getProtectedRoute(<LeaveApprovals />)}
            />

            <Route index element={getProtectedRoute(<LeaveRequest />)} />
          </Route>

          {/*task route*/}
          <Route path="tasks">
            <Route
              path="leaves"
              element={getProtectedRoute(<LeaveRequest />)}
            />

            <Route
              path={"details"}
              element={getProtectedRoute(<TaskDetails />)}
            />

            <Route path={"add"} element={getProtectedRoute(<AddTaskPage />)} />

            <Route index element={getProtectedRoute(<TaskPage />)} />
          </Route>

          {/*court monitoring*/}
          <Route path="/CourtT" element={getProtectedRoute(<CourtT />)} />
          <Route
            path="/CourtMm"
            element={getProtectedRoute(<CourtMainPage />)}
          />
          <Route
            path="/chargesheet"
            element={getProtectedRoute(<ChargesheetPage />)}
          />
          <Route path="/CourtTwo" element={getProtectedRoute(<CourtTwo />)} />
          <Route
            path="/witness"
            element={getProtectedRoute(<WitnessManagementPage />)}
          />

          <Route path="/notice" element={getProtectedRoute(<NoticeTable />)} />
          <Route
            path="/CasePreparationTable"
            element={getProtectedRoute(<CasePreparationTable />)}
          />

          <Route path="records">
            <Route index element={getProtectedRoute(<MyStationPage />)} />
            <Route
              path="witnesss"
              element={getProtectedRoute(<WitnessManagementPages />)}
            />
            <Route path="forensic" element={getProtectedRoute(<Forensic />)} />
          </Route>
          {/*manpower route*/}
          <Route path="/manpower">
            <Route index element={getProtectedRoute(<Manpower />)} />
            <Route path="man" element={getProtectedRoute(<ManpowerStatic />)} />
            <Route path="mans" element={getProtectedRoute(<ManpowerPages />)} />
            <Route
              path="staff-distribution"
              element={getProtectedRoute(<StaffDistribution />)}
            />
            <Route path="laws" element={getProtectedRoute(<LawOrderPage />)} />

            <Route
              path="lawandoder"
              element={getProtectedRoute(<LawOrderPagess />)}
            />
          </Route>
          {/*emergency zones*/}
          <Route path="emergency_zones">
            <Route index element={getProtectedRoute(<EmergencyZones />)} />
            <Route path="zone" element={getProtectedRoute(<ZoneDetails />)} />
          </Route>
        </Route>

        {/* auth route */}
        <Route
          path="/auth"
          element={isUserLoggedIn ? <Navigate to="/" replace /> : <AuthPage />}
        />

        {/* event add page */}
        <Route path="/public" element={<PublicPage />}>
          <Route index element={<AddEventPage />} />
          <Route path={"add-event"} element={<AddEventPage />} />
          <Route
            path="PublicNoticeTable"
            element={getProtectedRoute(<PublicNoticeTable />)}
          />
          <Route
            path="PublicIncidentReporting"
            element={getProtectedRoute(<PublicIncidentReporting />)}
          />
          <Route
            path="WantedList"
            element={getProtectedRoute(<WantedList />)}
          />
        </Route>

        {/* video page link */}
        <Route path="video" element={<VideoPage />} />

        {/* error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
