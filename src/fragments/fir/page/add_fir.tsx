import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Select} from "antd";
import {TaskType} from '@/fragments/fir/modals/fir_modal.ts';
import {doSaveFIR} from "@/fragments/fir/utils/do_save_fir.ts";
import {toast} from "react-toastify";
import {CheckIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import inspector_data from "@/data/json/inspector_data.json";
import assistant_commisioner_data from '@/data/json/assistant_commisioner_data.json';
import sub_inspector_data from '@/data/json/sub_inspector_data.json';
import head_constable_data from '@/data/json/head_constable_data.json';
import constable_data from '@/data/json/constable_data.json';
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import commisioner_data from '@/data/json/commisioner_data.json';
import {useEffect, useState} from "react";
import * as Select2 from "@radix-ui/react-select";

const AddFir = () => {
	const {userdata, stationList} = useSelector((s: RootState) => s.auth);
	const [stationId, setStationId] = useState<string | null>(null);
	
	useEffect(() => {
		setStationId(stationList?.at(0)?.id ?? "");
	}, [stationList]);
	
	const getStationNameById = (id: string | undefined) => {
		const station = stationList.find((station) => station.id === id);
		return station ? station.station_name : "Select a station";
	};
	
	const {
		
		control,
		register,
		handleSubmit,
		setValue,
		formState: {errors, isSubmitting},
		reset,
	} = useForm<TaskType>();
	
	const onSubmit: SubmitHandler<TaskType> = async (data) => {
		
		if (!userdata || !stationId) {
			return;
		}
		
		await doSaveFIR({
			...data,
			fir_status: 'registered',
			stationId: stationId ?? '',
			registered_by_name: userdata?.name,
			registered_by_id: userdata?.id,
		});
		console.log(data);
		toast.success("FIR submitted successfully");
		reset();
	};
	
	const [users, setUsers] = useState<{ label: string, value: string }[]>([]);
	
	useEffect(() => {
		setUsers([
			...inspector_data,
			...assistant_commisioner_data,
			...commisioner_data,
			...sub_inspector_data,
			...head_constable_data,
			...constable_data,
		]
			.filter((user) => user.stationId === stationId)
			.map((user) => ({
				label: `${user.post} ${user.name}`,
				value: user.id,
			})))
		
	}, [stationId]);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<div
				className="w-full bg-white p-3 border-b-2 flex justify-between items-center text-base sticky top-0 z-[100]">
				<p className="font-open-sans font-semibold ">{"Add F.I.R"}</p>
				
				{/* station dropdown */}
				{stationList.length > 1 && (
					<Select2.Root
						value={stationId ?? ""}
						onValueChange={(s) => setStationId(s)}
					>
						<Select2.Trigger
							className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
							aria-label="Station"
						>
							
							<Select2.Value>{getStationNameById(stationId ?? "")}</Select2.Value>
							<Select2.Icon className="text-violet11">
								<ChevronDownIcon/>
							</Select2.Icon>
						</Select2.Trigger>
						
						<Select2.Portal>
							<Select2.Content
								className="overflow-hidden bg-white rounded-md shadow-lg z-[110]"
								position="popper"
							>
								<Select2.Viewport className="p-[5px]">
									{stationList.map((station, index) => (
										<div key={station.id}>
											<Select2.Item
												value={station.id ?? ""}
												className="text-[13px] py-3 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
											>
												<Select2.ItemText>
													<p className="text-base py-4 xl:text-lg">
														{station.station_name}
													</p>
												</Select2.ItemText>
												<Select2.ItemIndicator
													className="absolute left-0 w-[25px] inline-flex items-center justify-center">
													<CheckIcon/>
												</Select2.ItemIndicator>
											</Select2.Item>
											{index < stationList.length - 1 && (
												<div className="border-b border-gray-200 my-2"/>
											)}
										</div>
									))}
								</Select2.Viewport>
							</Select2.Content>
						</Select2.Portal>
					</Select2.Root>
				)}
				
				{/* station name  */}
				{stationList.length === 1 && (
					<h1>
						{stationList[0].station_name}
						{" station"}
					</h1>
				)}
			</div>
			
			
			<div className="bg-gray-100 p-6 pb-24">
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
							<Controller
								name="FIR_Type"
								control={control}
								rules={{required: "FIR type is required"}}
								render={({field}) => (
									<Select {...field} className="w-full my-2" placeholder="Select Fir Type">
										{['General Fir', 'Zero Fir', 'cognizable offence'].map((fir_type) => (
											<Select.Option key={fir_type} value={fir_type}>
												{fir_type}
											</Select.Option>
										))}
									</Select>
								)}
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
						
						<div className="col-span-2">
							<label>Assigned To</label>
							<Controller
								name="allotedTo"
								control={control}
								rules={{required: "Please select user(s)"}}
								render={({field}) => (
									<Select {...field} mode="multiple" className="w-full"
									        placeholder="Select User(s)"
									        options={users}/>
								)}
							/>
							<p className="text-xs text-red-600">{errors.allotedTo?.message}</p>
						</div>
					
					</div>
					
					<button disabled={isSubmitting} type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded">
						Submit FIR
					</button>
				</form>
			</div>
		</div>
	)
}
export default AddFir
