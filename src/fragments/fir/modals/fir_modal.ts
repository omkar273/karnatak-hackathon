import { Timestamp } from "firebase/firestore";

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
  timestamp: Timestamp;
  status: "registered" | "pending" | "in court" | "closed";
  allotedTo: string[];
};
