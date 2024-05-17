import { firestore } from "@/firebase/firebase_config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIRModal, FIRRecord } from "../modals/fir_modal";
import {
  getRandomElementFromArray,
  user_roles_ids,
} from "@/fragments/user_management/data/generate_user_data";

export const doSaveFIR = async (firData: FIRModal): Promise<boolean> => {
  try {
    await addDoc(collection(firestore, "fir_details"), {
      ...firData,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.log("Error Storing fir details :", error);
    return false;
  }
};

const fir_status = ["registered", "pending", "in court", "closed"];
const user_roles_station_ids = [
  "0I4m67wUiN2gtgS90kq0",
  "0rWPlw9omz29Sl7WdlhM",
  "1E7acZNyYcMpKETxqGfX",
];

export const doSaveFIR2 = async (firData: FIRRecord): Promise<boolean> => {
  try {
    await addDoc(collection(firestore, "fir_details"), {
      ...firData,
      timestamp: serverTimestamp(),
      allotedTo: user_roles_ids,
      fir_status: getRandomElementFromArray(fir_status),
      stationId: getRandomElementFromArray(user_roles_station_ids),
    });
    return true;
  } catch (error) {
    console.log("Error Storing fir details :", error);
    return false;
  }
};
