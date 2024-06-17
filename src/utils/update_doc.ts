// updateDocument.ts

// Generic function to update a document in Firestore
import {doc, updateDoc} from "firebase/firestore";
import {firestore} from "@/firebase/firebase_config.ts";
import {toast} from "react-toastify";

const updateFirebaseDocument = async <T>(
	collectionPath: string,
	docId: string,
	data: Partial<T>
) => {
	try {
		const docRef = doc(firestore, collectionPath, docId);
		await updateDoc(docRef, data);
		console.log(`Document with ID ${docId} in collection ${collectionPath} successfully updated.`);
	} catch (error) {
		toast.error(`Error updating document with ID ${docId} in collection ${collectionPath}: ${error}`,);
		throw error;
	}
};

export default updateFirebaseDocument
