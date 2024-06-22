import {Timestamp} from "firebase/firestore";

export interface FirModel {
	id?: string;
	District_Name: string;
	UnitName: string;
	FIRNo: string;
	RI: string;
	Year: string;
	Month: string;
	Offence_From_Date: string;
	Offence_To_Date: string;
	FIR_Reg_DateTime: string;
	FIR_Date: string;
	FIR_Type: string;
	FIR_Stage: string;
	Complaint_Mode: string;
	CrimeGroup_Name: string;
	CrimeHead_Name: string;
	Latitude: string;
	Longitude: string;
	ActSection: string;
	IOName: string;
	KGID: string;
	IOAssigned_Date: string | null;
	Place_of_Offence: string;
	Distance_from_PS: string;
	Beat_Name: string;
	Village_Area_Name: string;
	Male: string;
	Female: string;
	Boy: string;
	Girl: string;
	Age: string;
	VICTIM_COUNT: string;
	Accused_Count: string;
	Arrested_Male: string;
	Arrested_Female: string;
	Arrested_Count_No: string;
	Accused_ChargeSheeted_Count: string;
	Conviction_Count: string;
	FIR_ID: string;
	Unit_ID: string;
	Crime_No: string;
	Intern_l__O?: string;
	Internal_IO?: string;
	timestamp?: Timestamp;
	
	// meta data
	allotedTo?: {
		name: string;
		id: string;
		post: string;
	}[];
	fir_type?: string;
	fir_status?: string;
	stationId?: string;
	registered_by_name?: string;
	registered_by_id?: string;
	sections?: string;
}
