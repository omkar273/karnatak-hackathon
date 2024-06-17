/* eslint-disable react-hooks/exhaustive-deps */
import {RanksEnum} from "@/common/post/ranks";
import {setStationList} from "@/common/redux/auth_slice";
import {RootState} from "@/common/redux/store";
import {firestore} from "@/firebase/firebase_config";
import {StationModel} from "@/fragments/station/models/station_model";
import {Menu} from "antd";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	where,
} from "firebase/firestore";
import {
	BarChartBig, CalendarClock, CalendarRange,
	ClipboardList,
	FileStack,
	FileText,
	Home,
	Landmark,
	Mic,
	NotebookPen,
	NotepadText,
	Scale,
	ScrollText, Siren,
	University,
	User,
	UserCog,
	UserRoundPlus,
	Users,
} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const HomePage = () => {
	const navigate = useNavigate();
	const [drawerOpen, setdrawerOpen] = useState<boolean>(false);
	
	const navigateAndCloseDrawer = (path: string) => {
		setdrawerOpen(false);
		navigate(path);
	};
	
	const {userdata, currentUser} = useSelector((s: RootState) => s.auth);
	
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	
	loading;
	useEffect(() => {
		const fetchData = async () => {
			if (!userdata) return;
			
			setLoading(true);
			
			try {
				if (userdata.stationId) {
					// Fetch specific station details for inspectors and constables
					
					const stationDoc = await getDoc(
						doc(firestore, "stations", userdata.stationId)
					);
					if (stationDoc.exists()) {
						const stationData = stationDoc.data() as StationModel;
						dispatch(
							setStationList([
								{
									...stationData,
									timestamp: stationData.timestamp
										? stationData.timestamp.seconds * 1000
										: null,
								},
							])
						);
					}
				} else if (
					userdata.post === RanksEnum.Commisioner ||
					userdata.post === RanksEnum.AssistantCommisioner
				) {
					const search_field =
						userdata.post === RanksEnum.Commisioner
							? "commissioner_id"
							: "assistant_commissioner_id";
					
					const q = query(
						collection(firestore, "stations"),
						where(search_field, "==", currentUser?.user.uid),
						limit(3)
					);
					
					const querySnapshot = await getDocs(q);
					
					const stations: StationModel[] = [];
					querySnapshot.forEach((doc) => {
						stations.push(doc.data() as StationModel);
					});
					
					dispatch(
						setStationList(
							stations.map((station) => ({
								...station,
								timestamp: station.timestamp
									? station.timestamp.seconds * 1000
									: null,
							}))
						)
					);
				}
			} catch (error) {
				console.error("Error fetching station data:", error);
			} finally {
				setLoading(false);
			}
		};
		
		fetchData();
	}, [userdata, currentUser]);
	
	const sidebarItems = [
		{
			key: "Dashboard",
			label: "Dashboard",
			onClick: () => navigateAndCloseDrawer("/"),
			icon: <BarChartBig/>,
		},
		{
			key: "Station Management",
			label: "Station Management",
			icon: <Home/>,
			children: [
				{
					key: "My Station",
					label: "Station Management",
					onClick: () => navigateAndCloseDrawer("/station"),
					icon: <Home/>,
				},
				{
					key: "Add Station",
					label: "Add Station",
					icon: <University/>,
					onClick: () => navigateAndCloseDrawer("/station/add"),
				},
				{
					key: "Task Assignment",
					label: "Task Assignment",
					icon: <ClipboardList/>,
					onClick: () => navigateAndCloseDrawer("/station/tasks"),
				},
				
				{
					key: "Law and order",
					label: "Law and order",
					icon: <Scale/>,
					onClick: () => navigateAndCloseDrawer("/law"),
				},
				{
					key: "Law and order 2",
					label: "Law and order 2",
					icon: <Scale/>,
					onClick: () => navigateAndCloseDrawer("/lawandoder"),
				},
			],
		},
		{
			key: "Court Monitoring",
			label: "Court Monitoring",
			icon: <Landmark/>,
			children: [
				{
					key: "Chargesheet",
					label: "Chargesheet",
					icon: <ScrollText/>,
					onClick: () => navigateAndCloseDrawer("/chargesheet"),
				},
				{
					key: "Witness Management",
					label: "Witness Management",
					icon: <Mic/>,
					onClick: () => navigateAndCloseDrawer("/witness"),
				},
				{
					key: "Case Preparation",
					label: "Case Preparation",
					icon: <NotepadText/>,
					
					onClick: () => navigateAndCloseDrawer("/CourtTwo"),
				},
			],
		},
		{
			key: "Fir Management",
			label: "Fir Management",
			icon: <FileText/>,
			children: [
				{
					key: "Add Fir",
					label: "Add Fir",
					icon: <NotebookPen/>,
					onClick: () => navigateAndCloseDrawer("/fir"),
				},
				{
					key: "All Fir",
					label: "All Fir",
					icon: <FileStack/>,
					onClick: () => navigateAndCloseDrawer("/fir/all"),
				}, {
					key: "Report Incident",
					label: "Report Incident",
					icon: <FileStack/>,
					onClick: () => navigateAndCloseDrawer("/fir/report-incident"),
				},
			],
		},
		{
			key: "event-section",
			label: "Event Permissions",
			icon: <CalendarRange/>,
			children: [
				{
					key: "Events",
					label: "Events",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/events")
				}
			]
		},
		{
			key: "Emergency Zones",
			label: "Emergency Zones",
			icon: <Siren/>,
			onClick: () => navigateAndCloseDrawer("/emergency_zones"),
		},
		{
			key: "Manpower",
			label: "Manpower",
			icon: <User/>,
			children: [
				{
					key: "Manpower",
					label: "Manpower",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower"),
				},
				{
					key: "Manpower2",
					label: "Manpower Mapping",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower/man"),
				},
				
				{
					key: "Manpower Management",
					label: "Manpower Management",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower/mans"),
				},
				
				{
					key: "Staff Distribution",
					label: "Staff Distribution",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower/staff-distribution"),
				},
			]
		},
		{
			key: "User Management",
			label: "User Management",
			icon: <UserCog/>,
			children: [
				{
					key: "Add new user",
					label: "Add new user",
					icon: <UserRoundPlus/>,
					onClick: () => navigateAndCloseDrawer("/user/register"),
				},
				{
					key: "Underlyings",
					label: "Underlyings",
					icon: <Users/>,
					onClick: () => navigateAndCloseDrawer("/user/underlying"),
				},
				{
					key: "Profile",
					label: "Profile",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/user"),
				},
			],
		},
	
	];
	
	return (
		<div className="pg max-h-screen overflow-hidden">
			<Navbar
				sidebarItems={sidebarItems}
				drawerOpen={drawerOpen}
				setdrawerOpen={setdrawerOpen}
			/>
			
			<div className="flex max-h-screen mt-16 overflow-hidden">
				<Sidebar>
					<Menu
						defaultOpenKeys={["home"]}
						defaultSelectedKeys={["dashboard"]}
						mode="inline"
						items={sidebarItems}
						onClick={(e) => {
							e.key;
						}}
						style={{maxWidth: "18rem"}}
					/>
				</Sidebar>
				
				<main className="flex-grow overflow-hidden">
					<div className="max-h-screen hidden sm:block overflow-y-auto">
						{/* {page} */}
						<Outlet/>
					</div>
					<div
						className="h-screen w-full flex justify-center items-center p-4 text-center text-xl sm:hidden overflow-y-auto">
						{/* {page} */}
						<h1>You can only View this website on Landscape Mode or desktop</h1>
					</div>
				</main>
			</div>
		</div>
	);
};

export default HomePage;
