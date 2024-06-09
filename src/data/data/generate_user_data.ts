import { UserModel } from "../../fragments/user_management/models/user_model";
import { policeAwards, policeOfficerSkills } from "../dummy_users";
import { customFaker } from "./dummy_data";
import { generateUniqueUsername } from "./generate_unique_username";

export function getRandomElementFromArray<T>(arr: T[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array.");
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function getRandomInteger(startValue: number, endValue: number) {
  if (startValue > endValue) {
    throw new Error(
      "The start value must be less than or equal to the end value."
    );
  }
  const min = Math.ceil(startValue);
  const max = Math.floor(endValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const policeTrainingPrograms: string[] = [
  "Basic Police Training",
  "Firearms Training",
  "Criminal Investigation Techniques",
  "Community Policing Strategies",
  "Self-Defense and Physical Training",
  "Traffic Management and Accident Investigation",
  "Cybercrime Investigation",
  "Counter-Terrorism Training",
  "Forensic Science Training",
  "Crisis Negotiation and Hostage Rescue",
  "Drug Enforcement Training",
  "Anti-Human Trafficking Training",
  "First Aid and Emergency Response",
  "Leadership and Management Training",
  "Mental Health Crisis Intervention",
  "Cultural Sensitivity and Diversity Training",
  "Public Order and Riot Control",
  "Intelligence Gathering and Analysis",
  "Victim Assistance and Support",
  "Undercover Operations Training",
  "K-9 Handling and Training",
  "Bomb Disposal and Explosive Handling",
  "Legal and Ethical Training",
  "Surveillance and Reconnaissance",
  "Emergency Vehicle Operations",
  "Search and Rescue Operations",
  "Maritime Law Enforcement Training",
  "Advanced Driving Techniques",
  "Interview and Interrogation Techniques",
  "Patrol Procedures and Tactics",
  "Incident Command System Training",
  "Public Relations and Media Handling",
];

const getTraining = () => {
  const temp = [];
  for (let index = 0; index < 5; index++) {
    temp.push(getRandomElementFromArray(policeTrainingPrograms));
  }
  return temp;
};

export const generateRandomUserData = ({
  post,
  reporting_officer_id,
  reporting_officer_name,
  stationId,
  superiors_list,
}: {
  post: string;
  stationId?: string;
  reporting_officer_name?: string;
  reporting_officer_id?: string;
  superiors_list?: string[];
}) => {
  const skills: string[] = [];
  const awards: string[] = [];

  for (let index = 0; index < 4; index++) {
    skills.push(getRandomElementFromArray(policeOfficerSkills));
    awards.push(getRandomElementFromArray(policeAwards));
  }

  const user_full_name = customFaker.person.fullName();
  const username = generateUniqueUsername(
    user_full_name.replace(/-/g, "").replace(/\s/g, "")
  );

  const temp: UserModel = {
    id: customFaker.string.uuid().replace(/-/g, ""),

    // personal details
    name: user_full_name,
    post: post,
    date_of_joining: customFaker.date
      .between({ from: "2002-01-01", to: "2012-01-01" })
      .toLocaleDateString(),
    batch: "dummy batch",
    height: customFaker.number.int({ max: 180, min: 160 }),
    weight: customFaker.number.int({ max: 80, min: 65 }),

    // work details
    workExperience: customFaker.number.int({ max: 10, min: 1 }),
    certification: ["dummy certifications"],
    qualification: "graduated",
    solvedCases: customFaker.number.int({ max: 60, min: 2 }),

    previousPosting: "dummy previous posting",
    skills: skills,
    awards: awards,

    open_cases: customFaker.number.int({ max: 10, min: 1 }),
    closed_cases: customFaker.number.int({ max: 10, min: 1 }),

    // authentication details
    email: `${username}@gmail.com`,
    password: "23456789",
    username: username,
    reporting_officer_name: reporting_officer_name ?? null,
    reporting_officer_id: reporting_officer_id ?? null,
    stationId: stationId ?? "",
    superiors_list: superiors_list ?? [],

    bmi:
      Math.round(customFaker.number.float({ min: 18.5, max: 24.9 }) * 100) /
      100,
    phone_no: customFaker.phone.number(),
    blood_group: getRandomElementFromArray(["A", "B", "O", "AB"]),
    certifications: [],
    department: getRandomElementFromArray([
      "TrafficPolice",
      "CrimeBranch",
      "CyberCrimeCell",
      "AntiTerrorismSquad",
      "SpecialBranch",
      "WomensPoliceStations",
      "AntiNarcoticsCell",
      "ForensicScienceLaboratory",
      "PoliceTrainingAcademies",
      "BombDisposalSquad",
      "HumanRightsCell",
      "PublicRelationsDepartment",
    ]),
    training: getTraining(),
    specialization: "NA",
  };

  return temp;
};
