import {useCallback, useState} from "react";
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
import {firestore} from "@/firebase/firebase_config";
import TaskModel from "@/types/task_model";

interface UseTasksReturn {
	tasks: TaskModel[];
	fetchTasks: (newPage?: boolean) => Promise<void>;
	loading: boolean;
	error: Error | null;
	hasMore: boolean;
}

interface GetTasksParams {
	userId: string;
	role: "alloted_to_user" | "alloted_by_user";
	initialLimit?: number;
}

function useGetTasks({
	                     userId,
	                     role,
	                     initialLimit = 10,
                     }: GetTasksParams): UseTasksReturn {
	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [lastDoc, setLastDoc] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	
	const fetchTasks = useCallback(
		async (newPage = false) => {
			setLoading(true);
			setError(null);
			const fetchedTasks: TaskModel[] = [];
			
			try {
				const tasksCollection = collection(firestore, "tasks");
				
				let q = query(
					tasksCollection,
					orderBy("timestamp", "desc"),
					limit(initialLimit)
				);
				
				if (role === "alloted_to_user") {
					q = query(q, where("alloted_to_id", "array-contains", userId));
				} else if (role === "alloted_by_user") {
					q = query(q, where("assigned_by_id", "==", userId));
				}
				
				if (newPage && lastDoc) {
					q = query(q, startAfter(lastDoc));
				}
				
				const querySnapshot = await getDocs(q);
				
				let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
				
				querySnapshot.forEach((doc) => {
					const data = doc.data() as TaskModel;
					fetchedTasks.push({...data, id: doc.id});
					lastVisible = doc;
				});
				
				setTasks((prevTasks) =>
					newPage ? [...prevTasks, ...fetchedTasks] : fetchedTasks
				);
				setLastDoc(lastVisible);
				setHasMore(fetchedTasks.length >= initialLimit);
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
				}
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[userId, role, initialLimit, lastDoc]
	);
	
	return {tasks, fetchTasks, loading, error, hasMore};
}

export default useGetTasks;
