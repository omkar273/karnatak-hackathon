import {FieldValue, Timestamp} from "firebase/firestore";


interface TaskModel {
	alloted_to_id: string[];
	task_type: "Fir" | "Crime Investigation" | "Patrolling" | "Emergency Reporting" | "other";
	description: string;
	due_date: string;
	priority: string;
	alloted_date_time: string;
	status: 'complete' | 'in progress' | 'registered' | 'incomplete' | 'overdue';
	assigned_by_id: string,
	assigned_by_name: string,
	current_status?: string,
	case_no?: string | null,
	zone_name?: string | null,
	vehicle?: string | null,
	timestamp?: Timestamp | FieldValue;
	id?: string | null;
}

export interface TaskUpdateModel {
	id?: string;
	title?: string;
	description : string;
	update_date_time?: string
}

export default TaskModel
