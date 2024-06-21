/* eslint-disable @typescript-eslint/no-unused-vars */
import {RootState} from "@/common/redux/store";
import {CheckIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import zones_data from '@/data/json/zones_data.json'
import DashboardCasesPieCharts from "../components/dashboard_cases_piecharts";
import CourtOrders from "../components/dashboard_court";
import DashboardUserDataCards from "../components/dashboard_data_cards";
import DashboardStationCards from "../components/dashboard_station_data_cards";
import StationRatesGraph from "../components/station_rates_graph";
import ZonalData from "../components/zone_data";
import {RanksEnum} from "@/common/post/ranks.ts";
import CityData from "@/fragments/dashboard/components/city_data.tsx";

const DashboardPage = () => {
	const {stationList, userdata} = useSelector((s: RootState) => s.auth);
	
	const [stationId, setStationId] = useState<string | null>(null);
	const [zoneId, setZoneId] = useState<string | null>(null);
	
	
	useEffect(() => {
		setStationId(stationList?.at(0)?.id ?? "");
		setZoneId(zones_data?.at(0)?.id ?? "")
	}, [stationList]);
	
	const getStationNameById = (id: string | undefined) => {
		const station = stationList.find((station) => station.id === id);
		return station ? station.station_name : "Select a station";
	};
	
	const getStationDataById = (id: string | undefined) => {
		const station = stationList.find((station) => station.id === id);
		return station;
	};
	
	const getZoneNameById = (id: string | undefined) => {
		const zone = zones_data.find((zone) => zone.id === id);
		return zone ? `${zone.zoneName} zone` : "Select a Zone";
	};
	
	return (
		<div className="h-screen xl:overflow-y-scroll bg-gray-100 flex flex-col">
			<div
				className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
				<p className="font-open-sans font-semibold ">{"Dashboard"}</p>
				
				<div className={'flex gap-4'}>
					{/* station dropdown */}
					
					{
						userdata?.post === RanksEnum.Commisioner && (
							<Select.Root
								value={zoneId ?? ""}
								onValueChange={(s) => setZoneId(s)}
							>
								<Select.Trigger
									className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
									aria-label="Station"
								>
									<Select.Value>{getZoneNameById(zoneId ?? "")}</Select.Value>
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
											{zones_data.map((zone, index) => (
												<div key={zone.id}>
													<Select.Item
														value={zone.id ?? ""}
														className="text-[13px] py-3 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
													>
														<Select.ItemText>
															<p className="text-base py-4 xl:text-lg">
																{zone.zoneName}
															</p>
														</Select.ItemText>
														<Select.ItemIndicator
															className="absolute left-0 w-[25px] inline-flex items-center justify-center">
															<CheckIcon/>
														</Select.ItemIndicator>
													</Select.Item>
													{index < stationList.length - 1 && (
														<div className="border-b border-gray-200 my-2"/>
													)}
												</div>
											))}
										</Select.Viewport>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						)}
					
					
					{stationList.length > 1 && (
						<Select.Root
							value={stationId ?? ""}
							onValueChange={(s) => setStationId(s)}
						>
							<Select.Trigger
								className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
								aria-label="Station"
							>
								<Select.Value>{getStationNameById(stationId ?? "")}</Select.Value>
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
													value={station.id ?? ""}
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
												{index < stationList.length - 1 && (
													<div className="border-b border-gray-200 my-2"/>
												)}
											</div>
										))}
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					)}
					
					{/* station name  */}
					{stationList.length === 1 && (
						<h1>
							{stationList[0].station_name}
							{" station"}
						</h1>
					)}
				</div>
			</div>
			
			
			{/* zonal data for commissioner */}
			<CityData/>
			<ZonalData zoneId={zoneId ?? ''}/>
			<DashboardUserDataCards/>
			
			<div>
			
			
			</div>
			
			
			{/* main content */}
			<div className="lg:flex lg:flex-grow lg:flex-row lg:gap-4">
				{/* left container */}
				<div className="flex-grow md:flex-[85%] px-4">
					{/* left container content */}
					<div>
						<DashboardStationCards stationId={stationId ?? ""}/>
						<StationRatesGraph stationId={stationId ?? ""}/>
						<DashboardCasesPieCharts stationId={stationId ?? ""}/>
						{
							stationId && (
								<CourtOrders
									lat={getStationDataById(stationId)?.lat || 0}
									lng={getStationDataById(stationId)?.lng || 0}
									station_name={getStationNameById(stationId)}
									station_id={stationId}
								/>
							)}
						
						<div className="min-h-96"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
