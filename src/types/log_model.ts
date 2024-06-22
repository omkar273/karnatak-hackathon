import {FieldValue, Timestamp} from "firebase/firestore";

interface LogModel {
	id?: string;
	message: string;
	ip?: string;
	user_id?: string;
	user_name?: string;
	timestamp?: FieldValue | Timestamp;
}

export default LogModel;
