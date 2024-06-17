import {FieldValue, Timestamp} from "firebase/firestore";

interface TaskModel {
	alloted_to_id: string[];
	task_type: string;
	description: string;
	due_date: string;
	priority: string;
	assigned_by_id: string,
	assigned_by_name: string,
	current_status?: string,
	case_no?: string | null,
	zone_name?: string | null,
	vehicle?: string | null,
	timestamp?: Timestamp | FieldValue;
	id?: string | null;
}

export default TaskModel
