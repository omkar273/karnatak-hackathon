import {collection, addDoc, DocumentData} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {firestore} from "@/firebase/firebase_config.ts";

export const addDocTOFirebase = async (path: string, data: DocumentData) => {
	try {
		const docRef = await addDoc(collection(firestore, path), data);
		return docRef.id;
		
	} catch (error) {
		toast.error(`${error}`);
	}
};
