import emergency_zones_data from '@/data/json/zones_data.json'
import {Link} from "react-router-dom";

const EmergencyZones = () => {
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Emergency Zones"}
			</p>
			<div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 p-8 mb-20'}>
				{
					emergency_zones_data.map((zone, index) => {
						return (
							<Link to={`/emergency_zones/zone?id=${zone.id}`} key={index}
							      className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 hover:scale-105 duration-300 transition-all cursor-pointer">
								<div className="font-bold text-xl mb-2">{`${zone.zoneName} Zone`}</div>
								<p className="text-gray-700 text-base">Zone Code: {zone.ZoneCode}</p>
								{zone.commisioner_name &&
                                    <p className="text-gray-700 text-base">Commissioner: {zone.commisioner_name}</p>}
								<div className="mt-4">
									<div className="flex justify-between items-center">
										<span className="text-gray-700">Crime Rate:</span>
										<span
											className="font-semibold text-gray-900">
											{`${zone.crime_rate}%` ?? 'N/A'}
										</span>
									</div>
									<div className="flex justify-between items-center mt-2">
										<span className="text-gray-700">Crime Clearance Rate:</span>
										<span
											className="font-semibold text-gray-900">{`${zone.crime_clearance_rate}%` ?? 'N/A'}</span>
									</div>
									{/*<div className="flex justify-between items-center mt-2">*/}
									{/*	<span className="text-gray-700">Open Cases:</span>*/}
									{/*	<span*/}
									{/*		className="font-semibold text-gray-900">{zone.open_cases ?? 'N/A'}</span>*/}
									{/*</div>*/}
									{/*<div className="flex justify-between items-center mt-2">*/}
									{/*	<span className="text-gray-700">Closed Cases:</span>*/}
									{/*	<span*/}
									{/*		className="font-semibold text-gray-900">{zone.closed_cases ?? 'N/A'}</span>*/}
									{/*</div>*/}
								</div>
							</Link>
						)
					})
				}
			</div>
		</div>
	);
};


export default EmergencyZones
