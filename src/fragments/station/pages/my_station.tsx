import {VSpacer} from "@/common/components/spacer";
import {Rate} from "antd";
import {Landmark, Mail, MapPinned, Phone, ShieldPlus} from "lucide-react";
import React, {ReactNode, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store";
import * as Select from '@radix-ui/react-select';
import {CheckIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import useGetDocument from "@/common/hooks/use_get_document";
import {GridLoader} from "react-spinners";
import {StationModel} from "../models/station_model";
import StaticMap from "@/common/components/static_map";
import StationStaffList from "../components/station_staff_list";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import StationCrimeRateChart from "../components/station_crime_rate_chart";
import StationWeaponsTable from "../components/weapons_table";
import StationVehiclesTable from "../components/station_vehicles_table";
import StationFirTable from "@/fragments/station/components/station_fir_table.tsx";

const MyStationPage: React.FC = () => {
	
	const {stationList} = useSelector((s: RootState) => s.auth)
	const [stationId, setStationId] = useState<string | null>(null);
	
	useEffect(() => {
		setStationId(stationList?.at(0)?.id ?? '')
	}, [stationList])
	
	const stationDetails = useGetDocument<StationModel>({
		docId: stationId,
		path: 'stations',
	})
	
	const tabsData: { tabTitle: string, element?: ReactNode | null }[] = [
		{
			tabTitle: 'Staff',
			element: <StationStaffList stationId={stationId}/>,
		}, {
			tabTitle: 'Staff Distribution',
			element: <StaticMap
				station_id={stationId ?? ''}
				lat={stationDetails.data?.lat || 0}
				lng={stationDetails.data?.lng || 0}
				station_name={stationDetails.data?.station_name}
			/>,
		},
		{
			tabTitle: 'Crime records',
			element: <StationCrimeRateChart stationId={stationId}/>,
		},{
			tabTitle: 'FIR',
			element: <StationFirTable stationId={stationId}/>,
		},
		{
			tabTitle: 'Financial records',
			element: <div>llloa</div>,
		},
		{
			tabTitle: 'Weapons',
			element: <StationWeaponsTable stationId={stationId}/>,
		},
		{
			tabTitle: 'vehicles',
			element: <StationVehiclesTable stationId={stationId}/>,
		},
	]
	
	const getStationNameById = (id: string | undefined) => {
		const station = stationList.find((station) => station.id === id);
		return station ? station.station_name : "Select a station";
	};
	
	if (stationDetails?.loading) {
		return (<div className="h-screen w-full flex justify-center items-center">
			<GridLoader
				color="#0891B2"
				size={25}
			/>
		</div>)
	}
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden">
			<div
				className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
				<p className="font-open-sans font-semibold ">
					{"Station"}
				</p>
				
				{/* station dropdown */}
				{
					stationList.length > 1 && (
						<Select.Root value={stationId ?? ''} onValueChange={(s) => setStationId(s)}>
							<Select.Trigger
								className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
								aria-label="Station"
							>
								<Select.Value>
									{getStationNameById(stationId ?? '')}
								</Select.Value>
								<Select.Icon className="text-violet11">
									<ChevronDownIcon/>
								</Select.Icon>
							</Select.Trigger>
							
							<Select.Portal>
								<Select.Content
									className="overflow-hidden bg-white rounded-md shadow-lg z-[110]"
									position="popper"
								>
									<Select.Viewport className="p-[5px]">
										{stationList.map((station, index) => (
											<div key={station.id}>
												<Select.Item
													value={station.id ?? ''}
													className="text-[13px] py-3 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
												>
													<Select.ItemText>
														<p className="text-base py-4 xl:text-lg">
															{station.station_name}
														</p>
													</Select.ItemText>
													<Select.ItemIndicator
														className="absolute left-0 w-[25px] inline-flex items-center justify-center">
														<CheckIcon/>
													</Select.ItemIndicator>
												</Select.Item>
												{index < stationList.length - 1 &&
                                                    <div className="border-b border-gray-200 my-2"/>}
											</div>
										))}
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					)
				}
				
				{/* station name  */}
				{
					stationList.length === 1 && (
						<h1>
							{stationList[0].station_name}{' station'}
						</h1>
					)
				}
			
			</div>
			<div className="p-4 bg-gray-100 ">
				
				<div className="bg-gray-100 min-h-screen">
					
					{/* basic station details */}
					<div className="card bg-white md:flex p-10">
						<div className="flex-[70%] flex-grow">
							<p className="text-2xl font-semibold flex gap-2 items-center">
								<ShieldPlus/>
								{stationDetails.data?.station_name}
								{` ( ${stationDetails.data?.zone_name} zone )`}
							</p>
							<p className="text-base font-bold">Station Incharge
								: {stationDetails.data?.station_incharge_name}</p>
							<VSpacer height={25}/>
							<div className="md:flex flex-wrap gap-x-12 gap-y-4 ">
                                <span className="flex gap-2 my-1 items-center">
                                    <MapPinned/>{stationDetails.data?.district}
                                </span>
								
								<span className="flex gap-2 my-1 items-center">
                                    <Landmark/>{stationDetails.data?.address}
                                </span>
								<span className="flex gap-2 my-1 items-center">
                                    <Phone/>{stationDetails.data?.phone}
                                </span>
								<span className="flex gap-2 my-1 items-center">
                                    <Mail/>{stationDetails.data?.email}
                                </span>
							
							</div>
							<VSpacer height={25}/>
							{/* <span className="flex gap-2 my-1 items-center">
                                <University />{stationDetails.data?.address}
                            </span> */}
							
							<div>
                                <span className="flex gap-2 my-1 items-center">
                                    Zonal incharge : {stationDetails.data?.commissioner_name}
                                </span>
								
								<span className="flex gap-2 my-1 items-center">
                                    Subzone incharge : {stationDetails.data?.assistant_commissioner_name}
                                </span>
							
							
							</div>
						</div>
						<div
							className="flex-[30%] w-full flex-grow  flex shadow-md bg-cyan-100 justify-center flex-col items-center border-2 rounded-md">
							<ShieldPlus className="text-center  size-28 mb-2"/>
							<Rate disabled allowHalf defaultValue={4.5}
							      tooltips={['Bad', 'betterment needed', 'good', 'Excellent', 'Ideal station']}/>
							<p className="font-semibold text-base my-2">Overall station rating</p>
						</div>
					</div>
					
					{/* imp staff */}
					<VSpacer height={25}/>
					
					{/* station details tabs all or tabs */}
					<Tabs defaultValue="tabView" className="w-full   md:my-8 my-4">
						<div className="w-full flex items-center justify-between bg-white rounded-md p-3 ">
							<h1 className="font-bold md:text-2xl text-base p-2">
								Station details
							</h1>
							
							<TabsList className="grid gap-2 grid-cols-2">
								<TabsTrigger value="tabView">Tab View</TabsTrigger>
								<TabsTrigger value="scrollView">Scroll view</TabsTrigger>
							</TabsList>
						</div>
						
						
						<TabsContent value="scrollView" className="my-3">
							{
								tabsData.map((tab, index) => (
									<div key={index}>
										{tab.element}
									</div>))
							}
						</TabsContent>
						
						<TabsContent value="tabView">
							<Tabs defaultValue={tabsData[0].tabTitle}
							      className="w-full md:my-2 my-1">
								<div className="w-full bg-white rounded-md p-3 ">
									<TabsList>
										{
											tabsData.map((tab, index) => (
												<TabsTrigger
													value={tab.tabTitle}
													key={index}>
													{tab.tabTitle}
												</TabsTrigger>
											))
										}
									</TabsList>
									{
										tabsData.map((tab, index) => (
											<TabsContent value={tab.tabTitle} key={index}>
												{tab.element}
											</TabsContent>))
									}
								</div>
							
							</Tabs>
						</TabsContent>
					
					</Tabs>
				</div>
				<VSpacer height={100}/>
			</div>
		
		</div>
	);
};

export default MyStationPage
