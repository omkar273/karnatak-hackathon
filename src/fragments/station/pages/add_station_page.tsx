import {VSpacer} from "@/common/components/spacer";
import {useState} from "react";
import {RegisterOptions, SubmitHandler, useForm} from "react-hook-form";
import {PulseLoader} from "react-spinners";
import {toast} from "react-toastify";
import StationsTable from "../components/station_table";
import {doSaveStation} from "../utils/do_save_station";
import TextArea from "@/common/components/text_area";
import InputField from "pages/auth/components/input_field";
import {StationModel} from "@/fragments/station/models/station_model";

const AddStationPage = () => {
	const {register, handleSubmit, formState: {isSubmitting, errors}, reset} = useForm<StationModel>();
	const [reload, setReload] = useState(true);
	
	const onSubmit: SubmitHandler<StationModel> = async (data) => {
		try {
			if (isSubmitting) {
				return;
			}
			
			await doSaveStation(data);
			toast.success('Station saved successfully');
			setReload((prev) => !prev);
			reset();
		} catch (error) {
			toast.error(`${error}`);
		}
	};
	
	const validationOptions: RegisterOptions = {
		required: 'Required',
	};
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-10">
				{"Add Station"}
			</p>
			<div className="p-4">
				<form onSubmit={handleSubmit(onSubmit)} className="card w-full p-5 bg-white">
					<p className="font-semibold text-2xl">Add Station</p>
					<div className="md:grid md:grid-cols-2 justify-center items-start gap-x-10">
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Station Name"
							error={errors.station_name?.message}
							name="station_name"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Email"
							error={errors.email?.message}
							name="email"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Phone"
							error={errors.phone?.message}
							name="phone"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Crime Rate"
							error={errors.crime_rate?.message}
							name="crime_rate"
							type="number"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Crime Clearance Rate"
							error={errors.crime_clearance_rate?.message}
							name="crime_clearance_rate"
							type="number"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Zone Name"
							error={errors.zone_name?.message}
							name="zone_name"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Zone Code"
							error={errors.zone_code?.message}
							name="zone_code"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="District"
							error={errors.district?.message}
							name="district"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Latitude"
							error={errors.lat?.message}
							name="lat"
							type="number"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Longitude"
							error={errors.lng?.message}
							name="lng"
							type="number"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Station Incharge Name"
							error={errors.station_incharge_name?.message}
							name="station_incharge_name"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Station Incharge ID"
							error={errors.station_incharge_id?.message}
							name="station_incharge_id"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Assistant Commissioner Name"
							error={errors.assistant_commissioner_name?.message}
							name="assistant_commissioner_name"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Assistant Commissioner ID"
							error={errors.assistant_commissioner_id?.message}
							name="assistant_commissioner_id"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Commissioner Name"
							error={errors.commissioner_name?.message}
							name="commissioner_name"
						/>
						<InputField<StationModel>
							validateOptions={validationOptions}
							register={register}
							label="Commissioner ID"
							error={errors.commissioner_id?.message}
							name="commissioner_id"
						/>
					</div>
					<TextArea<StationModel>
						validateOptions={validationOptions}
						register={register}
						label="Address"
						error={errors.address?.message}
						name="address"
					/>
					<VSpacer height={50}/>
					<button type="submit" className="btn font-ubuntu cursor-pointer text-xl">
						{isSubmitting ? (
							<span className="flex justify-center items-center gap-2">
                                {"Loading"}
								<PulseLoader color="white" loading={isSubmitting} size={8}/>
                            </span>
						) : (
							"Save Station"
						)}
					</button>
				</form>
				<VSpacer height={100}/>
				<StationsTable reload={reload}/>
				<VSpacer height={100}/>
			</div>
		</div>
	);
};

export default AddStationPage;
