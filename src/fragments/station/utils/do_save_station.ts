import { firestore } from "@/firebase/firebase_config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { StationModel } from "../models/station_model";

export const doSaveStation = async (data: StationModel): Promise<void> => {
  try {
    await addDoc(collection(firestore, "stations"), {
      ...data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Error Storing fir details : ${error}`);
  }
};
