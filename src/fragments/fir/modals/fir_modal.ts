import { FieldValue } from "firebase/firestore";

export type FIRModal = {
  name: string;
  fatherName: string;
  mobileNo: string;
  emailAddress: string;
  presentAddress: string;
  dateOfIncident: string;
  timeOfIncident: string;
  placeOfIncident: string;
  detailsOfIncident: string;
  timestamp: FieldValue;
};
