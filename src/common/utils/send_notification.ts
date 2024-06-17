import {firestore} from "@/firebase/firebase_config";
import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import {toast} from "react-toastify";

export interface NotificationData {
	id?: string;
	sender_name?: string;
	sender_id: string;
	recepient_id: string;
	notification_type: 'fir' | 'task' | 'emergency' | 'other';
	task_id?: string;
	timestamp?: Timestamp;
	isRead?: boolean;
}


const sendNotification = async (data: NotificationData) => {
	try {
		await addDoc(collection(firestore, "notifications"), {
			...data,
			timestamp: serverTimestamp(),
			isRead: false,
		});
	} catch (error) {
		toast.error(`${error}`);
	}
};

export default sendNotification;
