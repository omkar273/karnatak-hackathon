import  {useEffect} from 'react'
import LeaveApplicationTable from "@/fragments/applications/components/leave_data_table.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import useGetAllLeaveApplications from "@/fragments/applications/hooks/use_get_all_leaves.ts";

const LeaveApprovals = () => {
	
	const {userdata} = useSelector((state: RootState) => state.auth);
	const {fetchLeaveApplications, loading, documents} = useGetAllLeaveApplications({
		initialLimit: 10,
		sender_id: userdata?.id
	});
	
	useEffect(() => {
		if (userdata) {
			fetchLeaveApplications();
		}
	}, [userdata]);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Leave Approvals"}
			</p>
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
	)
}
export default LeaveApprovals
