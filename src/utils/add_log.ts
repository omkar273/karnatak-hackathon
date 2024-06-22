import LogModel from "@/types/log_model.ts";
import {toast} from "react-toastify";
import {addDocTOFirebase} from "@/utils/add_doc.ts";
import {serverTimestamp} from "firebase/firestore";

const addLog = async (data: LogModel) => {
	try {
		const res = await fetch('https://api.ipify.org/?format=json')
		if (res.ok) {
			const ip = await res.json()
			console.log(ip)
			await addDocTOFirebase('logs', {
				...data,
				...ip,
				timestamp: serverTimestamp()
			})
		}
		
		
	} catch (e) {
		toast.error(`Error : ${e}`)
	}
}
export default addLog
