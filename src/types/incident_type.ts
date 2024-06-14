import Latlng from "@/types/latlng.ts";

interface IncidentType {
	location: Latlng,
	description: string,
	incident_type: string,
	required_force: number,
	incident_date: string,
	incident_reported_by: string,
}

export default IncidentType
