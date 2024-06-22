import {GridLoader} from "react-spinners"
import useStationCounts from "../utils/use_station_counts"
import DataCard from "./data_card"
import {Link} from "react-router-dom";

const DashboardStationCards = ({stationId}: { stationId: string }) => {
	
	
	const {data, error, loading} = useStationCounts(stationId)
	
	if (loading) {
		return (
			<div className="p-12 w-full flex justify-center items-center">
				<GridLoader
					color="#0891B2"
					size={25}
				/>
			</div>
		)
	}
	
	
	return (
		<div>
			{/* <DashboardUserDataCards /> */}
			<p className="font-bold text-3xl px-4 pb-4">Station Data</p>
			<div className="p-5 grid md:grid-cols-3 md:gap-4 grid-cols-2">
				
				<Link to={'/station'}
					className="w-[276px] h-[65px] bg-white flex items-center justify-between p-0 shadow-md rounded-lg">
					<div className="flex-1">
						<span className="text-lg font-semibold p-4">Recent Cases</span>
					</div>
					<div className="w-[80px] h-[65px] bg-[#3283FC] flex items-center justify-center rounded-lg">
						<span className="text-white">9</span>
					</div>
				</Link>
				
				<Link to={'/station'}
					className="w-[276px] h-[65px] bg-white flex items-center justify-between p-0 shadow-md rounded-lg">
					<div className="flex-1">
						<span className="text-lg font-semibold p-4">Pending Cases</span>
					</div>
					<div className="w-[80px] h-[65px] bg-[#3283FC] flex items-center justify-center rounded-lg">
						<span className="text-white">8</span>
					</div>
				</Link>
				
				<Link to={'/station'}
					className="w-[276px] h-[65px] bg-white flex items-center justify-between p-0 shadow-md rounded-lg">
					<div className="flex-1">
						<span className="text-lg font-semibold p-4">Closed Cases</span>
					</div>
					<div className="w-[80px] h-[65px] bg-[#3283FC] flex items-center justify-center rounded-lg">
						<span className="text-white">12</span>
					</div>
				</Link>
			</div>
			<div
				className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-3  ">
				
				{
					!error && (
						<>
							<DataCard
								title="Cases registered this month"
								value={loading ? '--' : (data?.cases_registered ?? '--')}
								change_percentage={'-36%'}
							/>
							
							<DataCard
								title="Pending cases"
								value={loading ? '--' : (data?.pending_cases ?? '--')}
								change_percentage={'-12%'}
							/>
							
							<DataCard
								title="Closed cases"
								value={loading ? '--' : (data?.closed_cases ?? '--')}
								change_percentage={'+40'}
							/>
						
						</>
					)
				}
			</div>
		</div>
	)
}

export default DashboardStationCards
