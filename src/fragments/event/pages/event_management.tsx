import {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/common/redux/store.ts";
import useGetAllEvents from "@/fragments/event/hooks/use_get_all_events.ts";
import EventDataTable from "@/fragments/event/components/event_data_table.tsx";

const EventManagement = () => {
	const {userdata} = useSelector((state: RootState) => state.auth);
	const {fetchEvents, loading, documents} = useGetAllEvents({
		initialLimit: 10,
		stationId: userdata?.stationId
	});
	
	useEffect(() => {
		if (userdata) {
			fetchEvents();
		}
	}, [userdata]);
	
	
	return (
		<div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100 pb-24">
			<p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
				{"Event Management"}
			</p>
			<div className="p-4 w-full">
				{loading ? (
					<p>Loading events...</p>
				) : documents.length > 0 ? (
					<EventDataTable events={documents}/>
				) : (
					<p>No events found.</p>
				)}
			</div>
		</div>
	);
};

export default EventManagement;
