import TaskModel from "@/types/task_model.ts";
import {toast} from "react-toastify";
import {addDocTOFirebase} from "@/utils/add_doc.ts";
import {serverTimestamp} from "firebase/firestore";
import sendNotification from "@/common/utils/send_notification.ts";

function getCurrentDateTime() {
	const now = new Date();
	
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const doSaveTask = async (
	data: TaskModel,
	assigned_by_id: string,
	assigned_by_name: string
) => {
	try {
		const newData: TaskModel = {
			...data,
			assigned_by_id,
			assigned_by_name,
			status: 'registered',
			alloted_date_time: getCurrentDateTime(),
			timestamp: serverTimestamp(),
			current_status: data.current_status || 'Pending',
			case_no: data.case_no || null,
			zone_name: data.zone_name || null,
			vehicle: data.vehicle || null,
			id: data.id || null
		}
		
		console.log(newData)
		
		for (const userId of newData.alloted_to_id) {
			sendNotification({
				sender_name: newData.assigned_by_name || '',
				sender_id: newData.assigned_by_id,
				message: `New task assigned to you`,
				notification_type: "task",
				recepient_id: userId,
			})
		}
		
		await addDocTOFirebase(`tasks`, newData)
		toast.success("Task created successfully");
	} catch (e) {
		toast.error(`Error : ${e}`)
	}
}

export default doSaveTask
