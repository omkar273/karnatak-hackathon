import {useEffect, useState} from 'react';
import {useForm, SubmitHandler, RegisterOptions} from 'react-hook-form';
import IncidentType from '@/types/incident_type';
import InputField from "pages/auth/components/input_field.tsx";
import TextArea from "@/common/components/text_area.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import station_data from '@/data/json/stations_data.json'
import {StationModel} from "@/fragments/station/models/station_model.ts";
import {VSpacer} from "@/common/components/spacer.tsx";
import {UserModel} from "@/fragments/user_management/models/user_model.ts";
import inspector_data from '@/data/json/inspector_data.json'
import sub_inspector_data from '@/data/json/sub_inspector_data.json'
import head_constable_data from '@/data/json/head_constable_data.json'
import constable_data from '@/data/json/constable_data.json'
import NearbyUserMap from "@/fragments/fir/components/nearby_user_map.tsx";
import StaticMap from "@/common/components/static_map.tsx";
import 'leaflet/dist/leaflet.css';


const getStationById = (id: string | null | undefined): StationModel | null => {
	
	if (id) {
		for (const station of station_data) {
			if (station.id === id) {
				return station;
			}
		}
	}
	return null;
}

const IncidentReporting = () => {
	
	const [stationsList, setStationsList] = useState<StationModel[]>();
	const [stationId, setStationId] = useState<string | null>(null);
	
	const [nearbyUserList, setNearbyUserList] = useState<UserModel[]>([]);
	
	
	const {handleSubmit, register, formState: {errors, isSubmitting}, setValue} = useForm<IncidentType>();
	
	const onsubmit: SubmitHandler<IncidentType> = (data) => {
		console.log(data);
		const nearbyUsers = [
			...inspector_data.filter(user => user.stationId === stationId),
			...sub_inspector_data.filter(user => user.stationId === stationId),
			...head_constable_data.filter(user => user.stationId === stationId),
			...constable_data.filter(user => user.stationId === stationId),
		]
		setNearbyUserList(nearbyUsers)
		console.log(nearbyUsers.length)
	};
	
	const validationOptions: RegisterOptions = {
		required: 'Required'
	};
	
	useEffect(() => {
		setStationsList(station_data)
	}, []);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100 pb-24    ">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Report Incident"}
			</p>
			<div className="p-4">
				<form onSubmit={handleSubmit(onsubmit)} className="p-4 md:p-16 bg-white rounded shadow-md">
					<div className={'grid grid-cols-1 sm:grid-cols-2 gap-4 items-center'}>
						
						<div>
							<label
								htmlFor={'location-select'}
								className="w-full text-[1rem] text-gray-500"
							>
								{'Select the location'}
							</label>
							<VSpacer height={5}/>
							<Select onValueChange={(id) => {
								const station = getStationById(id)
								setStationId(station?.id ?? '')
								setValue('location', {lat: station?.lat ?? 0, lng: station?.lng ?? 0})
							}}>
								<SelectTrigger className="w-full p-6">
									<SelectValue placeholder="Select the location"/>
								</SelectTrigger>
								<SelectContent id={'location-select'}>
									{
										stationsList?.map((station, index) => (
											<SelectItem key={index}
											            value={station.id ?? ''}>{station.address}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<p className="mb-3 text-xs text-red-600">{errors.location?.message}</p>
						</div>
						
						<InputField
							register={register}
							name="incident_type"
							error={errors.incident_type?.message}
							validateOptions={validationOptions}
							label="Incident Type"
						/>
						<InputField
							register={register}
							name="required_force"
							error={errors.required_force?.message}
							validateOptions={validationOptions}
							label="Required Force"
							type="number"
						/>
						
						<InputField
							register={register}
							name="incident_reported_by"
							error={errors.incident_reported_by?.message}
							validateOptions={validationOptions}
							label="Reported By"
						/>
					
					</div>
					<TextArea
						register={register}
						name="description"
						error={errors.description?.message}
						validateOptions={validationOptions}
						label="Description"
					/>
					
					<button type="submit" disabled={isSubmitting}
					        className="w-full mt-4 p-4 bg-blue-500 text-white font-semibold text-xl rounded-md hover:bg-blue-600">
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</form>
				
				<div className={'w-full p-4 bg-white my-4'}>
					<div className={'w-1/2'}>
						{
							nearbyUserList.length > 0 && (
								<NearbyUserMap
									userList={nearbyUserList}
									lat={getStationById(stationId)?.lat || 0}
									lng={getStationById(stationId)?.lng || 0}
								/>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default IncidentReporting;
