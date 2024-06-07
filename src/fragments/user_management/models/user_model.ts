export type UserModel = {
  id?: string;

  // personal details
  name: string;
  post: string;
  dateOfJoining: string;
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

  stationList?: { stationName: string; stationId: string }[];

  // authentication details
  email: string;
  password: string;
  username: string;

  // role specific details

  // commisioner role details
  zone_id?: string;
  zone_name?: string;

  // inspector , sub inspector , head constable , constable role details
  stationId?: string;

  stationCode?: string;
  currentPosting?: string;
};
