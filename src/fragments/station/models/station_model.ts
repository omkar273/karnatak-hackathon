import { FieldValue } from "firebase/firestore";

export type StationModel = {
  stationName: string;
  email: string;
  stationId: string;
  district: string;
  station_incharge: string;
  crimeRate?: string;
  address: string;
  phone: string;
  zone_name?: string;
  timestamp?: FieldValue;
  id?: string;
  zoneCode: string;
  zoneId?: string;
  comesUnder?: string;
};
