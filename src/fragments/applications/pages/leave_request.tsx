import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {addDoc, collection, serverTimestamp,} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config.ts";
import LeaveApplicationModel from "@/types/leave_application_type.ts";
import {Select} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import LeaveApplicationTable from "@/fragments/applications/components/leave_data_table.tsx";
import {useEffect, useState} from "react";
import useGetAllLeaveApplications from "@/fragments/applications/hooks/use_get_all_leaves.ts";

const LeaveRequest = () => {
	
	const {userdata} = useSelector((state: RootState) => state.auth);
	const {fetchLeaveApplications, loading, documents} = useGetAllLeaveApplications({
		initialLimit: 10,
		sender_id: userdata?.id
	});
	const [reload, setReload] = useState(false);
	
	useEffect(() => {
		if (userdata) {
			fetchLeaveApplications();
		}
	}, [userdata, reload]);
	
	
	const {
		control,
		handleSubmit,
		register,
		reset,
		formState: {errors, isSubmitting},
	} = useForm<LeaveApplicationModel>();
	
	const onSubmit: SubmitHandler<LeaveApplicationModel> = async (data) => {
		try {
			const temp: LeaveApplicationModel = {
				...data,
				leave_status: 'request sent',
				requested_by_id: userdata?.id || '',
				requested_by_name: userdata?.name || '',
				timestamp: serverTimestamp(),
				send_to_id: [userdata?.reporting_officer_id ?? ''],
				zone_id: userdata?.zone_id || null,
				station_id: userdata?.stationId || null,
			}
			const eventsCollectionRef = collection(firestore, 'leave_applications');
			await addDoc(eventsCollectionRef, temp);
			toast.success(`Leave Applied successfully!`);
			reset()
			setReload(prev => !prev)
			
		} catch (e) {
			// Show error toast
			toast.error(`Error: ${e}`);
		}
	};
	
	return (
		<div className="max-h-screen bg-white overflow-y-scroll overflow-hidden">
			
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Leave Application"}
			</p>
			
			<div className="w-full my-4 p-4">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mb-24 rounded-lg px-4   bg-white "
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 ">
						
						<div>
							<p className="text-gray-500 pb-1">Leave Type</p>
							<Controller
								name="leave_type"
								control={control}
								rules={{required: "Please select leave type"}}
								render={({field}) => (
									<Select {...field} className="w-full" placeholder="Select Task Type">
										{[
											'Half pay leave',
											'Sick leave',
											'paternity Leave',
											'PLCL',
											'Work Leave'
										].map((type) => (
											<Select.Option key={type} value={type}>
												{type}
											</Select.Option>
										))}
									</Select>
								)}
							/>
							{errors.start_date && <p className="text-red-500">{errors.leave_type?.message}</p>}
						</div>
						
						<div>
							<p className="text-gray-500 pb-1">Event Start Date</p>
							<input
								{...register("start_date", {required: "Event start date is required"})}
								placeholder="eg: 22/06/2024"
								type="date"
								className="flex w-full text- rounded-md border border-input bg-gray-50 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
						</div>
						
						<div>
							<p className="text-gray-500 pb-1">Event End Date</p>
							<input
								{...register("end_date", {required: "Event end date is required"})}
								placeholder="eg: 22/06/2024"
								type="date"
								className="flex w-full text- rounded-md border border-input bg-gray-50 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}
						</div>
					</div>
					<div className="my-4">
						<p className="text-gray-500 pb-1">Reason</p>
						<textarea
							{...register("reason", {required: "Description is required"})}
							placeholder="Reason"
							className="flex w-full text- rounded-md border border-input bg-gray-50 p-3 ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
						/>
						{errors.reason && <p className="text-red-500">{errors.reason.message}</p>}
					</div>
					
					<button
						className="w-full  p-4 bg-cyan-500 text-white text-lg font-semibold rounded-md card"
						type="submit"
						disabled={isSubmitting}
					>
						Submit
					</button>
				</form>
			</div>
			
			
			<div className="p-4 w-full pb-48">
				{loading ? (
					<p>Loading events...</p>
				) : documents.length > 0 ? (
					<LeaveApplicationTable leaveApplications={documents}/>
				) : (
					<p>No events found.</p>
				)}
			</div>
		
		
		</div>
	);
};

export default LeaveRequest;
