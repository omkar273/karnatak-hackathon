import {useEffect, useState} from "react";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import LogModel from "@/types/log_model";
import {firestore} from "@/firebase/firebase_config";
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import {RanksEnum} from "@/common/post/ranks.ts";

// Custom Hook to fetch logs
const useLogs = (): { logs: LogModel[], loading: boolean, error: Error | null } => {
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

const AdminLogs = () => {
	const {logs, loading, error} = useLogs();
	
	const {userdata} = useSelector((s: RootState) => s.auth);
	
	const [userAcces, setuserAcces] = useState(false);
	useEffect(() => {
		if (userdata?.post === RanksEnum.Admin) {
			setuserAcces(true)
		}
	}, [userdata, logs, loading]);
	
	
	if (loading) {
		return <div className="text-white">Loading...</div>;
	}
	
	if (!userAcces) {
		return (
			<div className={'min-h-screen bg-white flex justify-center items-center'}>
				<p>You dont have authority to acess this page</p>
			</div>
		)
	}
	
	
	if (error) {
		return <div className="text-red-500">Error: {error.message}</div>;
	}
	
	return (
		<div className="bg-black min-h-screen text-white p-4">
			<h1 className="text-xl font-bold mb-4">Admin Logs</h1>
			<ul>
				{logs.map(log => (
					<li key={log.id} className="mb-8">
						<p className="font-bold">
							IP {log.ip}
						</p>
						<p>
							USer Id : {log.user_id}
						</p>
						User name : {log.user_name}
						<p>
							{log.message}
						</p>
						{`${log.timestamp?.toDate()}`}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminLogs;
