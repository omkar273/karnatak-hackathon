// useUserCounts.ts
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { getRandomInteger } from "@/fragments/user_management/data/generate_user_data";

interface StationCounts {
  cases_registered: number;
  pending_cases: number;
  closed_cases: number;

  staff_distribution: {
    Cyber_Crime: number;
    Traffic: number;
    Narcotics: number;
    Forensics: number;
    Patrol: number;
    Public_Affairs: number;
    K9_Unit: number;
  };

  cases_distribution: {
    Theft: number;
    Drug_Trafficking: number;
    Violence: number;
    Assault: number;
    Bribery: number;
    Fraud: number;
  };
}

interface UseStationCountsResult {
  data: StationCounts | null;
  loading: boolean;
  error: string | null;
}

const getCurrentMonthYear = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero if necessary
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const useStationCounts = (
  stationId: string,
  monthYear: string = getCurrentMonthYear()
): UseStationCountsResult => {
  const [data, setData] = useState<StationCounts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const docRef = doc(
        firestore,
        `stations/${stationId}/counts/${monthYear}`
      );
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as StationCounts);
        } else {
          const initialData: StationCounts = {
            cases_registered: getRandomInteger(0, 100),
            pending_cases: getRandomInteger(0, 30),
            closed_cases: getRandomInteger(0, 70),

            cases_distribution: {
              Theft: getRandomInteger(0, 30),
              Drug_Trafficking: getRandomInteger(0, 30),
              Violence: getRandomInteger(0, 30),
              Assault: getRandomInteger(0, 30),
              Bribery: getRandomInteger(0, 30),
              Fraud: getRandomInteger(0, 30),
            },

            staff_distribution: {
              Cyber_Crime: getRandomInteger(0, 15),
              Traffic: getRandomInteger(0, 15),
              Narcotics: getRandomInteger(0, 15),
              Forensics: getRandomInteger(0, 15),
              Patrol: getRandomInteger(0, 15),
              Public_Affairs: getRandomInteger(0, 15),
              K9_Unit: getRandomInteger(0, 15),
            },
          };
          await setDoc(docRef, initialData);
          setData(initialData);
        }
      } catch (err) {
        if (err instanceof FirebaseError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
      console.log(data, loading, error);
    };

    fetchData();
  }, [stationId, monthYear]);

  return { data, loading, error };
};

export default useStationCounts;
