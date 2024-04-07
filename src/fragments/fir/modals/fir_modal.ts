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
};

export type FIRFormErrors = {
  name: string | null;
  fatherName: string | null;
  mobileNo: string | null;
  emailAddress: string | null;
  presentAddress: string | null;
  dateOfIncident: string | null;
  timeOfIncident: string | null;
  placeOfIncident: string | null;
  detailsOfIncident: string | null;
};
