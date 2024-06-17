import {firestore} from "@/firebase/firebase_config";
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
import {EventModel} from "@/types/event_type.ts";


interface UseEventsReturn {
	documents: EventModel[];
	fetchEvents: (newPage?: boolean) => Promise<void>;
	loading: boolean;
	error: Error | null;
	hasMore: boolean;
}

interface GetAllEventsParams {
	initialLimit?: number;
	stationId?: string | null;
}

function useGetAllEvents({
	                         initialLimit = 10,
	                         stationId = null,
                         }: GetAllEventsParams = {}): UseEventsReturn {
	const [documents, setDocuments] = useState<EventModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastDoc, setLastDoc] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	
	const fetchEvents = useCallback(
		async (newPage = false) => {
			setLoading(true);
			setError(null);
			const fetchedDocuments: EventModel[] = [];
			try {
				let q = query(
					collection(firestore, "events"),
					orderBy("timestamp"),
					limit(initialLimit)
				);
				
				if (stationId) {
					q = query(q, where("stationId", "==", stationId));
				}
				
				if (newPage && lastDoc) {
					q = query(q, startAfter(lastDoc));
				}
				
				const querySnapshot = await getDocs(q);
				
				let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
				
				querySnapshot.forEach((doc) => {
					const data = doc.data() as EventModel;
					fetchedDocuments.push({...data, id: doc.id});
					lastVisible = doc;
				});
				
				console.log(fetchedDocuments)
				
				setDocuments((prevDocs) =>
					newPage ? [...prevDocs, ...fetchedDocuments] : fetchedDocuments
				);
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
		},
		[initialLimit, stationId, lastDoc]
	);
	
	return {documents, fetchEvents, loading, error, hasMore};
}

export default useGetAllEvents;
