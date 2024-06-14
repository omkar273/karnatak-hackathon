import {useEffect, useState} from 'react';
import {useForm, SubmitHandler, RegisterOptions} from 'react-hook-form';
import IncidentType from '@/types/incident_type';
import InputField from "pages/auth/components/input_field.tsx";
import TextArea from "@/common/components/text_area.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import station_data from '@/data/json/stations_data.json'
import {StationModel} from "@/fragments/station/models/station_model.ts";
import {VSpacer} from "@/common/components/spacer.tsx";


const getStationById = (id: string): StationModel => {
	for (const station of station_data) {
		if (station.id === id) {
			return station;
		}
	}
}

const IncidentReporting = () => {
	
	const [stationsList, setStationsList] = useState<StationModel[]>();
	
	const {handleSubmit, register, control, formState: {errors, isSubmitting}, setValue} = useForm<IncidentType>();
	
	const onsubmit: SubmitHandler<IncidentType> = (data) => {
		console.log(data);
	};
	
	const validationOptions: RegisterOptions = {
		required: 'Required'
	};
	
	useEffect(() => {
		setStationsList(station_data)
	}, []);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
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
								setValue('location', {lat: station.lat ?? 0, lng: station.lng ?? 0})
							}}>
								<SelectTrigger className="w-full p-6">
									<SelectValue placeholder="Select the location"/>
								</SelectTrigger>
								<SelectContent  id={'location-select'}>
									{
										stationsList?.map((station, index) => (
											<SelectItem key={index} value={station.id ?? ''}>{station.address}</SelectItem>
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
			</div>
		</div>
	);
};

export default IncidentReporting;
