import {useForm, SubmitHandler} from 'react-hook-form';
import {toast} from 'react-toastify';
import {FIRRecord} from '@/fragments/fir/modals/fir_modal.ts';
import {doSaveFIR} from "@/fragments/fir/utils/do_save_fir.ts";

const AddFIRForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
		reset,
	} = useForm<FIRRecord>();
	
	const onSubmit: SubmitHandler<FIRRecord> = async (data) => {
		await doSaveFIR(data);
		console.log(data);
		toast.success("FIR submitted successfully");
		reset();
	};
	
	return (
		<div className="bg-gray-100 p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded">
				<h2 className="text-2xl font-semibold mb-6">Add FIR</h2>
				
				<div className="grid md:grid-cols-2 grid-cols-1 gap-6">
					<div className="col-span-2">
						<label>District Name</label>
						<input
							{...register("District_Name", {required: "District name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter district name"
						/>
						<p className="text-xs text-red-600">{errors.District_Name?.message}</p>
					</div>
					
					<div className="col-span-2">
						<label>Unit Name</label>
						<input
							{...register("UnitName", {required: "Unit name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter unit name"
						/>
						<p className="text-xs text-red-600">{errors.UnitName?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>FIR No</label>
						<input
							{...register("FIRNo", {required: "FIR number is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter FIR number"
						/>
						<p className="text-xs text-red-600">{errors.FIRNo?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>RI</label>
						<input
							{...register("RI", {required: "RI is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter RI"
						/>
						<p className="text-xs text-red-600">{errors.RI?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Year</label>
						<input
							{...register("Year", {required: "Year is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter year"
						/>
						<p className="text-xs text-red-600">{errors.Year?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Month</label>
						<input
							{...register("Month", {required: "Month is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter month"
						/>
						<p className="text-xs text-red-600">{errors.Month?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Offence From Date</label>
						<input
							type="datetime-local"
							{...register("Offence_From_Date", {required: "Offence from date is required"})}
							className="w-full p-2 border rounded"
							onChange={(e) => setValue("Offence_From_Date", e.target.value)}
						/>
						<p className="text-xs text-red-600">{errors.Offence_From_Date?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Offence To Date</label>
						<input
							type="datetime-local"
							{...register("Offence_To_Date", {required: "Offence to date is required"})}
							className="w-full p-2 border rounded"
							onChange={(e) => setValue("Offence_To_Date", e.target.value)}
						/>
						<p className="text-xs text-red-600">{errors.Offence_To_Date?.message}</p>
					</div>
					
					<div className="col-span-2">
						<label>FIR Registration DateTime</label>
						<input
							type="datetime-local"
							{...register("FIR_Reg_DateTime", {required: "FIR registration date and time is required"})}
							className="w-full p-2 border rounded"
							onChange={(e) => setValue("FIR_Reg_DateTime", e.target.value)}
						/>
						<p className="text-xs text-red-600">{errors.FIR_Reg_DateTime?.message}</p>
					</div>
					
					<div className="col-span-2">
						<label>FIR Date</label>
						<input
							type="datetime-local"
							{...register("FIR_Date", {required: "FIR date is required"})}
							className="w-full p-2 border rounded"
							onChange={(e) => setValue("FIR_Date", e.target.value)}
						/>
						<p className="text-xs text-red-600">{errors.FIR_Date?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>FIR Type</label>
						<input
							{...register("FIR_Type", {required: "FIR type is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter FIR type"
						/>
						<p className="text-xs text-red-600">{errors.FIR_Type?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>FIR Stage</label>
						<input
							{...register("FIR_Stage", {required: "FIR stage is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter FIR stage"
						/>
						<p className="text-xs text-red-600">{errors.FIR_Stage?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Complaint Mode</label>
						<input
							{...register("Complaint_Mode", {required: "Complaint mode is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter complaint mode"
						/>
						<p className="text-xs text-red-600">{errors.Complaint_Mode?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Crime Group Name</label>
						<input
							{...register("CrimeGroup_Name", {required: "Crime group name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter crime group name"
						/>
						<p className="text-xs text-red-600">{errors.CrimeGroup_Name?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Crime Head Name</label>
						<input
							{...register("CrimeHead_Name", {required: "Crime head name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter crime head name"
						/>
						<p className="text-xs text-red-600">{errors.CrimeHead_Name?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Latitude</label>
						<input
							{...register("Latitude", {required: "Latitude is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter latitude"
						/>
						<p className="text-xs text-red-600">{errors.Latitude?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Longitude</label>
						<input
							{...register("Longitude", {required: "Longitude is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter longitude"
						/>
						<p className="text-xs text-red-600">{errors.Longitude?.message}</p>
					</div>
					
					<div className="col-span-2">
						<label>Act Section</label>
						<input
							{...register("ActSection", {required: "Act section is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter act section"
						/>
						<p className="text-xs text-red-600">{errors.ActSection?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>IO Name</label>
						<input
							{...register("IOName", {required: "IO name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter IO name"
						/>
						<p className="text-xs text-red-600">{errors.IOName?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>KGID</label>
						<input
							{...register("KGID", {required: "KGID is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter KGID"
						/>
						<p className="text-xs text-red-600">{errors.KGID?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>IO Assigned Date</label>
						<input
							type="datetime-local"
							{...register("IOAssigned_Date")}
							className="w-full p-2 border rounded"
							onChange={(e) => setValue("IOAssigned_Date", e.target.value)}
						/>
					</div>
					
					<div className="col-span-1">
						<label>Place of Offence</label>
						<input
							{...register("Place_of_Offence", {required: "Place of offence is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter place of offence"
						/>
						<p className="text-xs text-red-600">{errors.Place_of_Offence?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Distance from PS</label>
						<input
							{...register("Distance_from_PS", {required: "Distance from PS is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter distance from PS"
						/>
						<p className="text-xs text-red-600">{errors.Distance_from_PS?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Beat Name</label>
						<input
							{...register("Beat_Name", {required: "Beat name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter beat name"
						/>
						<p className="text-xs text-red-600">{errors.Beat_Name?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Village/Area Name</label>
						<input
							{...register("Village_Area_Name", {required: "Village/Area name is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter village/area name"
						/>
						<p className="text-xs text-red-600">{errors.Village_Area_Name?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Male</label>
						<input
							{...register("Male", {required: "Male count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter male count"
						/>
						<p className="text-xs text-red-600">{errors.Male?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Female</label>
						<input
							{...register("Female", {required: "Female count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter female count"
						/>
						<p className="text-xs text-red-600">{errors.Female?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Boy</label>
						<input
							{...register("Boy", {required: "Boy count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter boy count"
						/>
						<p className="text-xs text-red-600">{errors.Boy?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Girl</label>
						<input
							{...register("Girl", {required: "Girl count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter girl count"
						/>
						<p className="text-xs text-red-600">{errors.Girl?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Age</label>
						<input
							{...register("Age", {required: "Age is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter age"
						/>
						<p className="text-xs text-red-600">{errors.Age?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Victim Count</label>
						<input
							{...register("VICTIM_COUNT", {required: "Victim count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter victim count"
						/>
						<p className="text-xs text-red-600">{errors.VICTIM_COUNT?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Accused Count</label>
						<input
							{...register("Accused_Count", {required: "Accused count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter accused count"
						/>
						<p className="text-xs text-red-600">{errors.Accused_Count?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Arrested Male</label>
						<input
							{...register("Arrested_Male", {required: "Arrested male count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter arrested male count"
						/>
						<p className="text-xs text-red-600">{errors.Arrested_Male?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Arrested Female</label>
						<input
							{...register("Arrested_Female", {required: "Arrested female count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter arrested female count"
						/>
						<p className="text-xs text-red-600">{errors.Arrested_Female?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Arrested Count No</label>
						<input
							{...register("Arrested_Count_No", {required: "Arrested count number is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter arrested count number"
						/>
						<p className="text-xs text-red-600">{errors.Arrested_Count_No?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Accused ChargeSheeted Count</label>
						<input
							{...register("Accused_ChargeSheeted_Count", {required: "Accused chargesheeted count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter accused chargesheeted count"
						/>
						<p className="text-xs text-red-600">{errors.Accused_ChargeSheeted_Count?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Conviction Count</label>
						<input
							{...register("Conviction_Count", {required: "Conviction count is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter conviction count"
						/>
						<p className="text-xs text-red-600">{errors.Conviction_Count?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Crime sections</label>
						<input
							{...register("sections", {required: "Sections is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter crime sections"
						/>
						<p className="text-xs text-red-600">{errors.FIR_ID?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Unit ID</label>
						<input
							{...register("Unit_ID", {required: "Unit ID is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter unit ID"
						/>
						<p className="text-xs text-red-600">{errors.Unit_ID?.message}</p>
					</div>
					
					<div className="col-span-1">
						<label>Crime No</label>
						<input
							{...register("Crime_No", {required: "Crime number is required"})}
							className="w-full p-2 border rounded"
							placeholder="Enter crime number"
						/>
						<p className="text-xs text-red-600">{errors.Crime_No?.message}</p>
					</div>
				</div>
				
				<button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded">
					Submit FIR
				</button>
			</form>
		</div>
	);
};

export default AddFIRForm;
