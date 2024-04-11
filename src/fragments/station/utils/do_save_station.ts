import { firestore } from "@/firebase/firebase_config";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";

export type StationModel = {
  name: string;
  region: string;
  stationID: string;
  location: string;
  description: string;
  crimeRate: string;
  timestamp: FieldValue;
  id: string;
};

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
