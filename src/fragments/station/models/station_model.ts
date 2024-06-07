import { FieldValue } from "firebase/firestore";

export type StationModel = {
  id?: string;

  // station detail
  station_name: string;
  email: string;
  phone: string;
  crime_rate?: number;
  crime_clearance_rate?: number;
  zone_name?: string;
  zone_code: string;
  zoneId?: string;

  // location details
  district: string;
  address: string;
  lat?: number;
  lng?: number;

  station_incharge_name?: string;
  station_incharge_id?: string;

  assistant_commissioner_name?: string;
  assistant_commissioner_id?: string;

  commissioner_name?: string;
  commissioner_id?: string;

  timestamp?: FieldValue;
};
