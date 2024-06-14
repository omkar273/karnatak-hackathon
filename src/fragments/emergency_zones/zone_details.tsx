import React, { useEffect, useState } from 'react';
import { ZoneModel } from "@/fragments/station/models/zone_model.ts";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import emergency_zones_data from '@/data/json/zones_data.json';
import { ArrowLeft } from "lucide-react";
import { Input } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { RanksEnum } from "@/common/post/ranks.ts";
import stations_data from '@/data/json/stations_data.json';
import { StationModel } from "@/fragments/station/models/station_model.ts";
import StationCard from "@/fragments/emergency_zones/components/station_data_card.tsx";

const ZoneDetails = () => {
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	
	const [zoneData, setZoneData] = useState<ZoneModel | null>(null);
	const [stationList, setStationList] = useState<StationModel[]>([]);
	const [filter, setFilter] = useState('all');
	const [query, setQuery] = useState('');
	
	useEffect(() => {
		const id = queryParams.get('id');
		if (!id) {
			navigate('/emergency_zones');
			return;
		}
		
		const zone = emergency_zones_data.find(
			z => z.id === id);
		if (zone) {
			setZoneData(zone);
		} else {
			navigate('/emergency_zones');
			return;
		}
		
		const stations = stations_data.filter(station => station.zoneId === id);
		setStationList(stations);
	}, [queryParams, navigate]);
	
	const filteredStations = stationList.filter(station => {
		const matchesFilter = filter === 'all' || station.zoneId === filter;
		const matchesQuery = station.station_name.toLowerCase().includes(query.toLowerCase());
		return matchesFilter && matchesQuery;
	});
	
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	
	const handleClearSearch = () => {
		setQuery('');
	};
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex items-center text-base sticky gap-2 top-0 z-[100]">
				<Link to={'/emergency_zones'}>
					<ArrowLeft />
				</Link>
				<h1>
					{`${zoneData?.zoneName} Zone`}
				</h1>
			</div>
			
			<div className='w-full p-4 bg-white'>
				<h1 className='md:text-2xl font-bold font-open-sans'>
					Stations {` (${filteredStations.length}) `}
				</h1>
				<h2>
					All the police personnel in station are listed here
				</h2>
				
				<div className='w-full flex gap-3 items-center'>
					<Input
						className="my-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Search here"
						value={query}
						onChange={handleSearch}
						suffix={query === '' ? (
							<SearchOutlined className="cursor-pointer text-xl" />
						) : (
							<CloseOutlined
								onClick={handleClearSearch}
								className="cursor-pointer text-xl" />
						)}
					/>
					<Select onValueChange={(s) => setFilter(s)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value={RanksEnum.Inspector}>High priority Zones</SelectItem>
							<SelectItem value={RanksEnum.SubInpector}>Low Priority Zones</SelectItem>
							<SelectItem value={RanksEnum.HeadConstable}>Safe Zones</SelectItem>
							<SelectItem value={RanksEnum.Constable}>Constable</SelectItem>
						</SelectContent>
					</Select>
				</div>
				
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8'>
					{filteredStations.map((station, index) => (
						<StationCard station={station} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ZoneDetails;
