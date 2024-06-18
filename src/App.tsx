import StaffDistribution from "@/fragments/Manpower/pages/staff_distribution.tsx";
import EmergencyZones from "@/fragments/emergency_zones/emergency_zones.tsx";
import ZoneDetails from "@/fragments/emergency_zones/zone_details.tsx";
import IncidentReporting from "@/fragments/fir/page/incident_reporting.tsx";
import "leaflet/dist/leaflet.css";
import {ReactNode} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import useUserData from "./common/hooks/useUserData";
import {setUserdata} from "./common/redux/auth_slice";
import {RootState} from "./common/redux/store";
import Forensic from "./fragments/Forensic/forensic";
import ManpowerPages from "./fragments/Manpower/pages/manpowe3";
import Manpower from "./fragments/Manpower/pages/manpower";
import ManpowerStatic from "./fragments/Manpower/pages/manpower2";
import VehiclePage from "./fragments/New/new";
import CourtTwo from "./fragments/court/cout_two";
import CourtMainPage from "./fragments/court/coutmain";
import ChargesheetPage from "./fragments/court/pages/chargesheet_page";
import CourtT from "./fragments/court/third_page";
import DashboardPage from "./fragments/dashboard/pages/dashboard_page";
import AllFirPage from "./fragments/fir/page/all_fir_page";
import FirDetailsPage from "./fragments/fir/page/fir_details_page";
import LawOrderPage from "./fragments/law and order/pages/law_order_page";
import LawOrderPagess from "./fragments/law and order/pages/lawandoderpage";
import NoticeTable from "./fragments/notice/odernotice";
import ProfilePage from "./fragments/profile/page/profile_page";
import AddStationPage from "./fragments/station/pages/add_station_page";
import MyStationPage from "./fragments/station/pages/my_station";
import TasksPage from "./fragments/tasks/pages/tasknew";
import TaskAssignmentPage from "./fragments/tasks/pages/tasks_page";
import UnderlyingDataPage from "./fragments/underlying/page/underlying_page";
import RegisterFragment from "./fragments/user_management/register_page";
import WitnessManagementPages from "./fragments/witness management/pages/witness";
import WitnessManagementPage from "./fragments/witness management/pages/witness_management_page";
import AdminDashboardPage from "./pages/admin/admin_dashboard_page";
import AuthPage from "./pages/auth/page/auth_page";
import ErrorPage from "./pages/error/error_page";
import HomePage from "./pages/home/page/home_page";
import VideoPage from "./pages/videos/page/video_page";
import AddEventPage from "@/fragments/events/pages/add_event.tsx";
import PublicPage from "pages/pulic/page/public_page.tsx";
import EventManagement from "@/fragments/event/pages/event_management.tsx";
import AddFir from "@/fragments/fir/page/add_fir.tsx";
import LeaveRequest from "@/fragments/applications/pages/leave_request.tsx";
import LeaveApprovals from "@/fragments/applications/pages/leave_approvals.tsx";

const App = () => {
	const {isUserLoggedIn, currentUser} = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const userData = useUserData(currentUser?.user.uid);
	
	dispatch(setUserdata(userData));
	
	const getProtectedRoute = (element: ReactNode) => {
		return isUserLoggedIn ? element : <Navigate to="/auth" replace/>;
	};
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={getProtectedRoute(<HomePage/>)}>
					<Route index element={getProtectedRoute(<DashboardPage/>)}/>
					
					{/* fir route */}
					<Route path="fir">
						<Route index element={getProtectedRoute(<AddFir/>)}/>
						<Route path="all" element={getProtectedRoute(<AllFirPage/>)}/>
						<Route
							path="report-incident"
							element={getProtectedRoute(<IncidentReporting/>)}
						/>
						<Route
							path="details"
							element={getProtectedRoute(<FirDetailsPage/>)}
						/>
					</Route>
					
					{/* station routes */}
					<Route path="station">
						<Route index element={getProtectedRoute(<MyStationPage/>)}/>
						<Route path="add" element={getProtectedRoute(<AddStationPage/>)}/>
						
						<Route path="tasks" element={getProtectedRoute(<TaskAssignmentPage/>)}
						/>
						<Route path="task" element={getProtectedRoute(<TasksPage/>)}/>
					</Route>
					
					<Route path="user">
						<Route
							path="register"
							element={getProtectedRoute(<RegisterFragment/>)}
						/>
						<Route
							path="underlyings"
							element={getProtectedRoute(<UnderlyingDataPage/>)}
						/>
						
						<Route
							path="underlying"
							element={getProtectedRoute(<UnderlyingDataPage/>)}
						/>
						<Route index element={getProtectedRoute(<ProfilePage/>)}/>
					</Route>
					
					{/*application route*/}
					<Route path="application">
						<Route
							path="leaves"
							element={getProtectedRoute(<LeaveRequest/>)}
						/>
						
						<Route index element={getProtectedRoute(<EventManagement/>)}/>
						
						<Route path={'events'} element={getProtectedRoute(<EventManagement/>)}/>
						
						<Route path={'leaves/manage'} element={getProtectedRoute(<LeaveApprovals/>)}/>
						
						<Route index element={getProtectedRoute(<LeaveRequest/>)}/>
					</Route>
					
					
					<Route path="/CourtT" element={getProtectedRoute(<CourtT/>)}/>
					<Route
						path="/CourtMm"
						element={getProtectedRoute(<CourtMainPage/>)}
					/>
					<Route
						path="/chargesheet"
						element={getProtectedRoute(<ChargesheetPage/>)}
					/>
					<Route path="/CourtTwo" element={getProtectedRoute(<CourtTwo/>)}/>
					<Route
						path="/witness"
						element={getProtectedRoute(<WitnessManagementPage/>)}
					/>
					<Route path="/vehicle" element={<VehiclePage/>}/>
					<Route path="/notice" element={getProtectedRoute(<NoticeTable/>)}/>
					<Route
						path="/witnesss"
						element={getProtectedRoute(<WitnessManagementPages/>)}
					/>
					<Route path="/forensic" element={getProtectedRoute(<Forensic/>)}/>
					<Route
						path="/Record"
						element={getProtectedRoute(<MyStationPage/>)}
					/>
					
					<Route path="/manpower">
						<Route index element={getProtectedRoute(<Manpower/>)}/>
						<Route path="man" element={getProtectedRoute(<ManpowerStatic/>)}/>
						<Route path="mans" element={getProtectedRoute(<ManpowerPages/>)}/>
						<Route
							path="staff-distribution"
							element={getProtectedRoute(<StaffDistribution/>)}
						/>
					</Route>
					
					
					<Route
						path="/lawandoder"
						element={getProtectedRoute(<LawOrderPagess/>)}
					/>
					<Route path="/law" element={getProtectedRoute(<LawOrderPage/>)}/>
					
					<Route path="emergency_zones">
						<Route index element={getProtectedRoute(<EmergencyZones/>)}/>
						<Route path="zone" element={getProtectedRoute(<ZoneDetails/>)}/>
					</Route>
				</Route>
				
				{/* auth route */}
				<Route
					path="/auth"
					element={isUserLoggedIn ? <Navigate to="/" replace/> : <AuthPage/>}
				/>
				
				{/* event add page */}
				<Route path="/public" element={<PublicPage/>}>
					<Route index element={<AddEventPage/>}/>
					<Route path={'add-event'} element={<AddEventPage/>}/>
				</Route>
				
				{/* video page link */}
				<Route path="video" element={<VideoPage/>}/>
				
				{/* admin route */}
				<Route path="/admin" element={<AdminDashboardPage/>}/>
				
				{/* error route */}
				<Route path="*" element={<ErrorPage/>}/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
