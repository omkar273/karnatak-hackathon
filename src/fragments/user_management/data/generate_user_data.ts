import { UserModel } from "../models/user_model";
import {
  policeAwards,
  policeOfficerSkills,
  RanksArray,
  stationsIDs,
  UserFullNames,
} from "./dummy_users";

function generateRandomDate(startYear = 2000, endYear = 2002) {
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
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

export function getRandomElementFromArray(arr: string[]) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array.");
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const generateRandomUserData = (index: number) => {
  const tempPost = getRandomElementFromArray(RanksArray);

  // eslint-disable-next-line prefer-const
  let superiorsId: string[] = [];

  switch (tempPost) {
    case "Commisioner":
      //   superiorsId.push("KOL001");
      break;
    case "Assistant Commisioner":
      superiorsId.push("9JNU15eYCvXbrg0TB9Fw86nIitl1");
      break;
    case "Inspector":
      superiorsId.push("9JNU15eYCvXbrg0TB9Fw86nIitl1");
      break;
    case "Sub Inpector":
      superiorsId.push("cIdq3uFJS1aNTBFaS5tdDVj9Sgh1");
      break;
    case "Head Constable":
      // superiorsId.push('')
      break;
    case "Constable":
      superiorsId.push("OXuO1zPvLferzTF6sc6xAyRKOKA3");
      break;
    default:
      superiorsId.push("9JNU15eYCvXbrg0TB9Fw86nIitl1");

      break;
  }

  const skills: string[] = [];
  const awards: string[] = [];

  for (let index = 0; index < 4; index++) {
    skills.push(getRandomElementFromArray(policeOfficerSkills));
    awards.push(getRandomElementFromArray(policeAwards));
  }

  const temp: UserModel = {
    name: getRandomElementFromArray(UserFullNames),
    post: tempPost,
    dateOfJoining: generateRandomDate(),
    batch: getRandomInteger(1992, 2004).toString(),
    currentPosting: "Banglore Police Station",
    workExperience: `${getRandomInteger(1, 6)} years`,
    certification: "Crime Scene Investigation",
    qualification: "Bachelor of Arts",
    solvedCases: getRandomInteger(1, 10),
    height: getRandomInteger(165, 178),
    weight: getRandomInteger(50, 100),
    previousPosting: "Banglore Police Station",
    skills: skills,
    awards: awards,
    email: `dummy${index}@gmail.com`,
    password: "123456789",
    username: `dummy${index}`,
    stationId: getRandomElementFromArray(stationsIDs),
    open_cases: 0,
    closed_cases: 0,
    stationCode: "CHE002",
    superiors: superiorsId,
  };

  return temp;
};
