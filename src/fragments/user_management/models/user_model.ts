export type UserModel = {
  id?: string;

  // personal details
  name: string;
  post: string;
  batch: string;
  height: number;
  weight: number;

  // work details
  workExperience?: number;
  certification?: string[];
  qualification?: string;
  solvedCases: number;

  previousPosting?: string;
  skills?: string[];
  awards?: string[];
  superiors_list?: string[];
  underlyings?: string[];
  reporting_officer_name?: string | null;
  reporting_officer_id?: string | null;

  open_cases?: number;
  closed_cases?: number;

  // professsional details
  date_of_joining?: string;
  specialization?: string;
  training?: string[];
  certifications?: string[];

  // Health Information
  blood_group?: string;

  // persoanal details
  phone_no: string;

  // stationList?: { stationName: string; stationId: string }[];

  // authentication details
  email: string;
  password: string;
  username: string;
  bmi: number;

  // role specific details

  // commisioner role details
  zone_id?: string;
  zone_name?: string;

  // inspector , sub inspector , head constable , constable role details
  stationId?: string;
  department?: string;

  stationCode?: string;
  currentPosting?: string;

  // extra data
  phoneNo?: string;
  gender?: string;
  dateOfBirth?: string;
  mobileNo?: string;
  address?: string;
};
