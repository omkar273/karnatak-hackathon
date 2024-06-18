import {firestore} from "@/firebase/firebase_config";
import {UnderlyingModel} from "@/fragments/user_management/models/underlying_model";
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where,
} from "firebase/firestore";
import {useCallback, useState} from "react";

interface UseFIRsReturn {
	documents: UnderlyingModel[];
	fetchUnderlyings: (newPage?: boolean) => Promise<void>;
	loading: boolean;
	error: Error | null;
	hasMore: boolean;
}

function useGetAllUnderlyings(
	initialLimit: number | null = 10,
	userUid?: string | null
): UseFIRsReturn {
	const [documents, setDocuments] = useState<UnderlyingModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastDoc, setLastDoc] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	
	const fetchUnderlyings = useCallback(
		async (newPage = false) => {
			setLoading(true);
			setError(null);
			const fetchedDocuments: UnderlyingModel[] = [];
			try {
				if (!userUid) {
					return
				}
				let q = query(collection(firestore, `users`),
					where('reporting_officer_id', '==', userUid)
				);
				
				if (initialLimit) {
					q = query(q, limit(initialLimit));
				}
				
				if (newPage && lastDoc) {
					q = query(q, startAfter(lastDoc));
				}
				
				const querySnapshot = await getDocs(q);
				
				let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
				
				querySnapshot.forEach((doc) => {
					const data = doc.data() as UnderlyingModel;
					fetchedDocuments.push({...data});
					lastVisible = doc;
				});
				
				setDocuments((prevDocs) =>
					newPage ? [...prevDocs, ...fetchedDocuments] : fetchedDocuments
				);
				setLastDoc(lastVisible);
				
				if (initialLimit) {
					setHasMore(fetchedDocuments.length >= initialLimit);
				}
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
				}
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[initialLimit, userUid, lastDoc]
	);
	
	return {
		documents,
		fetchUnderlyings: fetchUnderlyings,
		loading,
		error,
		hasMore,
	};
}

export default useGetAllUnderlyings;
