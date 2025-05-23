/* eslint-disable react-hooks/exhaustive-deps */
import {RanksEnum} from "@/common/post/ranks";
import {setStationList} from "@/common/redux/auth_slice";
import {RootState} from "@/common/redux/store";
import {firestore} from "@/firebase/firebase_config";
import {StationModel} from "@/fragments/station/models/station_model";
import {AiAssistantButton} from "@sista/ai-assistant-react";
import {Menu, MenuProps} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import {collection, doc, getDoc, getDocs, limit, query, where,} from "firebase/firestore";
import {
	BarChartBig,
	CalendarClock,
	CalendarRange,
	Car,
	ClipboardList,
	ClipboardPlus,
	File,
	FileStack,
	FileText,
	Home,
	Landmark,
	NotebookPen,
	NotepadText,
	ScrollText,
	Siren,
	University,
	User,
	UserCog,
	UserRoundPlus,
	Users,
	UserSearch,
	UsersRound,
} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import addLog from "@/utils/add_log.ts";

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
		if (userdata) {
			addLog({
				user_id: userdata?.id,
				message: "user logged in",
				user_name: userdata?.name,
			})
		}
	}, [userdata]);
	
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
						limit(15)
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
	
	// sidebar logic
	
	const initalItems: MenuProps["items"] = [
		{
			key: "Dashboard",
			label: "Dashboard",
			onClick: () => navigateAndCloseDrawer("/"),
			icon: <BarChartBig/>,
		},
		{
			key: "Admin",
			label: "Admin",
			icon: <User/>,
			children: [
				{
					key: "Add new user",
					label: "Add new user",
					icon: <UserRoundPlus/>,
					onClick: () => navigateAndCloseDrawer("/admin/add-user"),
				},
				{
					key: "Add Station",
					label: "Add Station",
					icon: <University/>,
					onClick: () => navigateAndCloseDrawer("/admin/add-station"),
				},
			],
		},
		
		{
			key: "Station",
			label: "Station",
			icon: <Home/>,
			children: [
				{
					key: "My Station",
					label: "Station Management",
					onClick: () => navigateAndCloseDrawer("/station"),
					icon: <Home/>,
				},
				
				{
					key: "Task Assignment",
					label: "Task Assignment",
					icon: <ClipboardList/>,
					onClick: () => navigateAndCloseDrawer("/station/tasks"),
				},
				
				{
					key: "Vehicles",
					label: "Vehicles",
					icon: <Car/>,
					onClick: () => navigateAndCloseDrawer("/station/vehicle"),
				},
				
				{
					key: "Forensic Records",
					label: "Forensic Records",
					icon: <File/>,
					onClick: () => navigateAndCloseDrawer("/records/forensic"),
				},
				{
					key: "Witness Records",
					label: "Crime Investigation",
					icon: <File/>,
					onClick: () => navigateAndCloseDrawer("/records/witnesss"),
				},
			],
		},
		
		{
			key: "F.I.R Management",
			label: "F.I.R Management",
			icon: <FileText/>,
			children: [
				{
					key: "Add F.I.R",
					label: "Add F.I.R",
					icon: <NotebookPen/>,
					onClick: () => navigateAndCloseDrawer("/fir"),
				},
				{
					key: "All F.I.R",
					label: "All F.I.R",
					icon: <FileStack/>,
					onClick: () => navigateAndCloseDrawer("/fir/all"),
				},
				{
					key: "Report Incident",
					label: "Report Incident",
					icon: <ClipboardPlus/>,
					onClick: () => navigateAndCloseDrawer("/fir/report-incident"),
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
					icon: <UserSearch/>,
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
			key: "Manpower",
			label: "Manpower",
			icon: <User/>,
			children: [
				{
					key: "Law & Order",
					label: "Law & Order",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/LawOrderPage"),
				},
				{
					key: "Staff Distribution",
					label: "Staff Distribution",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower/staff-distribution"),
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
					key: "Manpower",
					label: "Manpower",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower"),
				},
			],
		},
		{
			key: "User Management",
			label: "User Management",
			icon: <UserCog/>,
			children: [
				{
					key: "Underlyings",
					label: "Underlyings",
					icon: <Users/>,
					onClick: () => navigateAndCloseDrawer("/user/underlying"),
				},
			],
		},
		{
			key: "event-section",
			label: "Applications",
			icon: <CalendarRange/>,
			children: [
				{
					key: "Event Permissions",
					label: "Event Permissions",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/events"),
				},
				{
					key: "Leaves",
					label: "Leaves",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves"),
				},
				{
					key: "Leave Approval",
					label: "Leave Approval",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves/manage"),
				},
			],
		},
		
		{
			key: "Notices",
			label: "Notices",
			onClick: () => navigateAndCloseDrawer("/notice"),
			icon: <NotepadText/>,
		},
		{
			key: "Emergency Zones",
			label: "Emergency Zones",
			icon: <Siren/>,
			onClick: () => navigateAndCloseDrawer("/emergency_zones"),
		},
		{
			key: "Public Section",
			label: "Public Section",
			icon: <UsersRound/>,
			onClick: () => navigateAndCloseDrawer("/public"),
		},
		{
			key: "Profile",
			label: "Profile",
			icon: <User/>,
			onClick: () => navigateAndCloseDrawer("/user"),
		},
	];
	const adminSidebarItems: MenuProps["items"] = [
		{
			key: "Dashboard",
			label: "Dashboard",
			onClick: () => navigateAndCloseDrawer("/"),
			icon: <BarChartBig/>,
		},
		{
			key: "Add new user",
			label: "Add new user",
			icon: <UserRoundPlus/>,
			onClick: () => navigateAndCloseDrawer("/admin/add-user"),
		},
		{
			key: "Add Station",
			label: "Add Station",
			icon: <University/>,
			onClick: () => navigateAndCloseDrawer("/admin/add-station"),
		},
		
		{
			key: "event-section",
			label: "Applications",
			icon: <CalendarRange/>,
			children: [
				{
					key: "Event Permissions",
					label: "Event Permissions",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/events"),
				},
				{
					key: "Leaves",
					label: "Leaves",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves"),
				},
				{
					key: "Leave Approval",
					label: "Leave Approval",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves/manage"),
				},
			],
		},
		
		{
			key: "Notices",
			label: "Notices",
			onClick: () => navigateAndCloseDrawer("/notice"),
			icon: <NotepadText/>,
		},
		{
			key: "Emergency Zones",
			label: "Emergency Zones",
			icon: <Siren/>,
			onClick: () => navigateAndCloseDrawer("/emergency_zones"),
		},
		{
			key: "Public Section",
			label: "Public Section",
			icon: <UsersRound/>,
			onClick: () => navigateAndCloseDrawer("/public"),
		},
		{
			key: "Profile",
			label: "Profile",
			icon: <User/>,
			onClick: () => navigateAndCloseDrawer("/user"),
		},
	];
	const commonSidebarItems: MenuProps["items"] = [
		{
			key: "Dashboard",
			label: "Dashboard",
			onClick: () => navigateAndCloseDrawer("/"),
			icon: <BarChartBig/>,
		},
		
		{
			key: "Station",
			label: "Station",
			icon: <Home/>,
			children: [
				{
					key: "My Station",
					label: "Station Management",
					onClick: () => navigateAndCloseDrawer("/station"),
					icon: <Home/>,
				},
				{
					key: "Vehicles",
					label: "Vehicles",
					icon: <Car/>,
					onClick: () => navigateAndCloseDrawer("/station/vehicle"),
				},
				
				{
					key: "Forensic Records",
					label: "Forensic Records",
					icon: <File/>,
					onClick: () => navigateAndCloseDrawer("/records/forensic"),
				},
				{
					key: "Witness Records",
					label: "Crime Investigation",
					icon: <File/>,
					onClick: () => navigateAndCloseDrawer("/records/witnesss"),
				},
			],
		},
		
		{
			key: "F.I.R Management",
			label: "F.I.R Management",
			icon: <FileText/>,
			children: [
				{
					key: "Add F.I.R",
					label: "Add F.I.R",
					icon: <NotebookPen/>,
					onClick: () => navigateAndCloseDrawer("/fir"),
				},
				{
					key: "All F.I.R",
					label: "All F.I.R",
					icon: <FileStack/>,
					onClick: () => navigateAndCloseDrawer("/fir/all"),
				},
				{
					key: "Report Incident",
					label: "Report Incident",
					icon: <ClipboardPlus/>,
					onClick: () => navigateAndCloseDrawer("/fir/report-incident"),
				},
			],
		},
		{
			key: "Task Assignment",
			label: "Task Assignment",
			icon: <ClipboardList/>,
			children: [
				{
					key: "My Task",
					label: "My Task",
					icon: <ScrollText/>,
					onClick: () => navigateAndCloseDrawer("/tasks"),
				},
				{
					key: "Add Task",
					label: "Add Task",
					icon: <ScrollText/>,
					onClick: () => navigateAndCloseDrawer("/tasks/add"),
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
					icon: <UserSearch/>,
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
			key: "Manpower",
			label: "Manpower",
			icon: <User/>,
			children: [
				{
					key: "Law & Order",
					label: "Law & Order",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/LawOrderPage"),
				},
				{
					key: "Staff Distribution",
					label: "Staff Distribution",
					icon: <User/>,
					onClick: () => navigateAndCloseDrawer("/manpower/staff-distribution"),
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
			],
		},
		{
			key: "User Management",
			label: "User Management",
			icon: <UserCog/>,
			children: [
				{
					key: "Underlyings",
					label: "Underlyings",
					icon: <Users/>,
					onClick: () => navigateAndCloseDrawer("/user/underlying"),
				},
			],
		},
		{
			key: "event-section",
			label: "Applications",
			icon: <CalendarRange/>,
			children: [
				{
					key: "Event Permissions",
					label: "Event Permissions",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/events"),
				},
				{
					key: "Leaves",
					label: "Leaves",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves"),
				},
				{
					key: "Leave Approval",
					label: "Leave Approval",
					icon: <CalendarClock/>,
					onClick: () => navigateAndCloseDrawer("/application/leaves/manage"),
				},
			],
		},
		
		{
			key: "Notices",
			label: "Notices",
			onClick: () => navigateAndCloseDrawer("/notice"),
			icon: <NotepadText/>,
		},
		{
			key: "Emergency Zones",
			label: "Emergency Zones",
			icon: <Siren/>,
			onClick: () => navigateAndCloseDrawer("/emergency_zones"),
		},
		{
			key: "Public Section",
			label: "Public Section",
			icon: <UsersRound/>,
			onClick: () => {
				const url = `${window.location.origin}/public`;
				window.open(url, "_blank", "noopener,noreferrer");
			},
		},
		{
			key: "Profile",
			label: "Profile",
			icon: <User/>,
			onClick: () => navigateAndCloseDrawer("/user"),
		},
	];
	
	const [sidebarItems, setSidebarItems] =
		useState<MenuProps["items"]>(initalItems);
	useEffect(() => {
		if (userdata?.post == RanksEnum.Admin) {
			setSidebarItems(adminSidebarItems);
		} else {
			setSidebarItems(commonSidebarItems);
		}
	}, [userdata?.post]);
	
	return (
		<div className="pg max-h-screen overflow-hidden">
			<Navbar
				sidebarItems={commonSidebarItems as MenuItemType[]}
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
			<AiAssistantButton
				style={{position: "fixed", bottom: "2rem", right: "2rem"}}
			/>
		</div>
	);
};

export default HomePage;
