import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StationModel } from "../models/station_model";

const useGetStationDetails = (stationId: string | undefined | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); // Default empty error message
  const [data, setData] = useState<StationModel | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!stationId) {
          setError("station id is null or undefined.");
          return;
        }

        setLoading(true);
        const docRef = doc(firestore, "stations", stationId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data() as StationModel);
        } else {
          setError("Document does not exist.");
        }

        setLoading(false);
      } catch (error) {
        if (error instanceof FirebaseError) {
          setError(`Firebase Error: ${error.code} - ${error.message}`);
        } else {
          setError(`Error fetching document: ${error}`);
        }
        setLoading(false);
      }
    };

    fetchDocument();
  }, [stationId]);

  return { loading, error, data };
};

export default useGetStationDetails;
