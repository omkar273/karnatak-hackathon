import {FieldValue, Timestamp} from "firebase/firestore";

interface LeaveApplicationModel {
	id?: string,
	requested_by_id: string,
	requested_by_name: string,
	start_date: string,
	end_date: string,
	reason: string,
	send_to_id: string[],
	timestamp: Timestamp | FieldValue,
	leave_status: 'declined' | 'approved' | 'request sent',
	leave_type: string,
	station_id: string | null,
	zone_id: string | null;
}


export default LeaveApplicationModel
