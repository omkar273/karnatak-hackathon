import {useEffect, useState} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import LogModel from "@/types/log_model.ts";
import {firestore} from "@/firebase/firebase_config.ts";


interface UseLogsResult {
	logs: LogModel[];
	loading: boolean;
	error: Error | null;
}

export const useLogs = (): UseLogsResult => {
	const [logs, setLogs] = useState<LogModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	
	useEffect(() => {
		const fetchLogs = async () => {
			setLoading(true);
			setError(null);
			try {
				const logsCollection = collection(firestore, 'logs');
				const logsQuery = query(logsCollection, orderBy('timestamp', 'asc'));
				const querySnapshot = await getDocs(logsQuery);
				
				const logsData: LogModel[] = [];
				querySnapshot.forEach((doc) => {
					logsData.push({id: doc.id, ...doc.data() as LogModel});
				});
				
				setLogs(logsData);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};
		
		fetchLogs();
	}, []);
	
	return {logs, loading, error};
};
