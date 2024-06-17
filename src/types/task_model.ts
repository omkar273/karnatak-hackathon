interface TaskModel {
	alloted_to_id: string[];
	task_type: string;
	description: string;
	due_date: string;
	priority: string;
	alloted_by_id: string,
	alloted_by_name: string,
	current_status?: string,
	case_no?: string,
	zone_name?: string,
	vehicle?: string,
	
}

export default TaskModel
