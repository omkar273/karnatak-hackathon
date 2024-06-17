import TaskModel from "@/types/task_model.ts";
import {toast} from "react-toastify";
import {addDocTOFirebase} from "@/utils/add_doc.ts";
import {serverTimestamp} from "firebase/firestore";

const doSaveTask = async (
	data: TaskModel,
	assigned_by_id: string,
	assigned_by_name: string
) => {
	try {
		data.alloted_to_id.map(async (value) => {
			const newData: TaskModel = {
				...data,
				assigned_by_id,
				assigned_by_name,
				timestamp: serverTimestamp(),
				current_status: data.current_status || 'Pending',
				case_no: data.case_no || null,
				zone_name: data.zone_name || null,
				vehicle: data.vehicle || null,
				id: data.id || null
			}
			console.log(newData)
			await addDocTOFirebase(`users/${value}/tasks`, newData)
		})
		toast.success("Task created successfully");
	} catch (e) {
		toast.error(`Error : ${e}`)
	}
}

export default doSaveTask
