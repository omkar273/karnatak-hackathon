import React from 'react';
import {FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser} from 'react-icons/fa';
import {StationModel} from "@/fragments/station/models/station_model.ts";

interface StationCardProps {
	station: StationModel;
}

const StationCard: React.FC<StationCardProps> = ({station}) => {
	return (<div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-6 cursor-pointer active:scale-95 transition-all duration-300" >
		
		<div className="font-bold text-2xl mb-6">
			{station.station_name}
		</div>
		
		<div className="flex items-center text-gray-700 text-base mb-2">
			<FaEnvelope className="mr-2"/>
			{station.email}
		</div>
		
		<div className="flex items-center text-gray-700 text-base mb-2">
			<FaPhone className="mr-2"/>
			{station.phone}
		</div>
		
		<div className="flex items-center text-gray-700 text-base mb-2">
			<FaMapMarkerAlt
				className="mr-2"/>
			{station.address},
			{station.district}
		
		</div>
		
		<div className="mt-4">
			
			<div className="flex justify-between items-center">
				<span className="text-gray-700">Crime Rate:</span>
				<span
					className="font-semibold text-gray-900">
					{station.crime_rate ?? 'N/A'}
				</span>
			
			</div>
			<div className="flex justify-between items-center mt-2">
				<span className="text-gray-700">
					Crime Clearance Rate:
				</span>
				
				<span
					className="font-semibold text-gray-900">
					{station.crime_clearance_rate ?? 'N/A'}
				</span>
			</div>
			
			{station.station_incharge_name && (
				<div className="flex items-center text-gray-700 text-base mt-4">
					<FaUser
						className="mr-2"/>
					Incharge: {station.station_incharge_name}
				</div>)}
		</div>
	</div>);
};
export default StationCard;
