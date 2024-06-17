import {Timestamp} from "firebase/firestore";

export interface EventModel {
	id?: string;
	start_date: string,
	end_date: string,
	duration_in_hrs?: number,
	start_timing: string,
	end_timing: string,
	no_people_gathering: number,
	venue: string,
	description: string,
	event_head_name: string,
	event_head_phone: string,
	event_head_email: string,
	stationId?: string,
	timestamp?: Timestamp;
	police_id?: string;
	status?: string;
}
