import {Radio} from 'antd'
import assistant_commisioner_data from '@/data/json/assistant_commisioner_data.json';
// import commisioner_data from '@/data/json/commisioner_data.json';
// import inspector_data from '@/data/json/inspector_data.json';
// import sub_inspector_data from '@/data/json/sub_inspector_data.json';
// import head_constable_data from '@/data/json/head_constable_data.json';
// import constable_data from '@/data/json/constable_data.json';
import zones_data from '@/data/json/zones_data.json';
import stations_data from '@/data/json/stations_data.json';
import StaffDistributionMap from "@/fragments/Manpower/components/staff_distribution_map.tsx";
import StaffDistributionEnum from "@/fragments/Manpower/enum/staff_distribution_enum.ts";
import {useState} from "react";


const StaffDistribution = () => {
	const [distributionType, setDistributionType] = useState<StaffDistributionEnum>(StaffDistributionEnum.Ranks);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div
				className="bg-white p-3 border-b-2 border  flex justify-between items-center  sticky  top-0 z-[100]">
				<h1 className={'text-xl font-open-sans font-semibold'}>
					{"Staff Distribution"}
				</h1>
				
				<Radio.Group
					defaultValue={distributionType}
					size="middle"
					buttonStyle={'solid'}
					onChange={(e) => setDistributionType(e.target.value)}
				>
					<Radio.Button value={StaffDistributionEnum.Ranks}>Ranks</Radio.Button>
					<Radio.Button value={StaffDistributionEnum.Department}>Dept</Radio.Button>
					<Radio.Button value={StaffDistributionEnum.Skill}>Skills</Radio.Button>
				</Radio.Group>
			
			
			</div>
			<div className="p-4">
				
				<div className={'p-4 card bg-white'}>
					<div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'}>
						<h1>Zones : {zones_data.length}</h1>
						<h1>Stations : {stations_data.length}</h1>
						<h1>Zones : 8</h1>
						<h1>Zones : 8</h1>
					</div>
				</div>
				
				<div className={'relative h-[50vh] overflow-hidden p-4 rounded-md bg-white my-4'}>
					<StaffDistributionMap
						lat={0}
						lng={0}
						distribution_type={distributionType}
						stationList={stations_data}
						userList={assistant_commisioner_data}/>
					
					<div className={'absolute'}>
					
					</div>
				
				</div>
			</div>
		</div>
	)
}


export default StaffDistribution
