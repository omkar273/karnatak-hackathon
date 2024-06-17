import {firestore} from "@/firebase/firebase_config";
import LeaveApplicationModel from "@/types/leave_application_type";
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where,
} from "firebase/firestore";
import {useCallback, useState} from "react";

interface UseLeaveApplicationsReturn {
	documents: LeaveApplicationModel[];
	fetchLeaveApplications: (newPage?: boolean) => Promise<void>;
	loading: boolean;
	error: Error | null;
	hasMore: boolean;
}

interface GetAllLeaveApplicationsParams {
	initialLimit?: number;
	approval_officer_id?: string | null;
	sender_id?: string | null;
}

function useGetAllLeaveApplications({
	                                    initialLimit = 10, approval_officer_id = null, sender_id = null,
                                    }: GetAllLeaveApplicationsParams = {}): UseLeaveApplicationsReturn {
	const [documents, setDocuments] = useState<LeaveApplicationModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	
	const fetchLeaveApplications = useCallback(async (newPage = false) => {
		setLoading(true);
		setError(null);
		const fetchedDocuments: LeaveApplicationModel[] = [];
		try {
			let q = query(collection(firestore, "leave_applications"), orderBy("timestamp", 'desc'), limit(initialLimit));
			
			if (approval_officer_id) {
				q = query(q, where("send_to_id", "array-contains", approval_officer_id));
			}
			
			if (sender_id) {
				q = query(q, where("requested_by_id", "==", sender_id));
			}
			
			if (newPage && lastDoc) {
				q = query(q, startAfter(lastDoc));
			}
			
			const querySnapshot = await getDocs(q);
			
			let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
			
			querySnapshot.forEach((doc) => {
				const data = doc.data() as LeaveApplicationModel;
				fetchedDocuments.push({...data, id: doc.id});
				lastVisible = doc;
			});
			
			console.log(fetchedDocuments)
			
			setDocuments((prevDocs) => newPage ? [...prevDocs, ...fetchedDocuments] : fetchedDocuments);
			setLastDoc(lastVisible);
			setHasMore(fetchedDocuments.length >= initialLimit);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				setError(err);
			}
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	}, [initialLimit, approval_officer_id, sender_id, lastDoc]);
	
	return {documents, fetchLeaveApplications, loading, error, hasMore};
}

export default useGetAllLeaveApplications;
