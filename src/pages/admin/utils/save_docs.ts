import {firestore} from "@/firebase/firebase_config";
import {doc, DocumentData, setDoc} from "firebase/firestore";
import {toast} from "react-toastify";

export const saveAllDocs = async (path: string, data: DocumentData) => {
	try {
		const userRef = doc(firestore, path);
		await setDoc(userRef, data);
		return userRef.id
	} catch (error) {
		toast.error(`${error}`);
	}
};
