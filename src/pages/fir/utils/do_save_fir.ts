import { firestore } from "@/firebase/firebase_config";
import { addDoc, collection } from "firebase/firestore";
import { FIRModal } from "../modals/fir_modal";

export const doSaveFIR = async (firData: FIRModal): Promise<boolean> => {
  try {
    await addDoc(collection(firestore, "fir_details"), firData);
    return true;
  } catch (error) {
    console.log("Error Storing fir details :", error);
    return false;
  }
};
