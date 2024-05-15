// useUserCounts.ts
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { getRandomInteger } from "@/fragments/user_management/data/generate_user_data";

interface Stationrates {
  jan: Rates;
  feb: Rates;
  mar: Rates;
  apr: Rates;
  may: Rates;
  jun: Rates;
  jul: Rates;
  aug: Rates;
  sep: Rates;
  oct: Rates;
  nov: Rates;
  dec: Rates;
}

interface Rates {
  crime_rate: number;
  crime_clearance_rate: number;
}

interface UseStationRatesResult {
  data: Stationrates | null;
  loading: boolean;
  error: string | null;
}

const getCurrentYear = () => {
  const date = new Date();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero if necessary
  return date.getFullYear().toString();
};

const useStationRates = (
  stationId: string,
  year: string = getCurrentYear()
): UseStationRatesResult => {
  const [data, setData] = useState<Stationrates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(stationId);

      const docRef = doc(firestore, `stations/${stationId}/rates/${year}`);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as Stationrates);
        } else {
          const initialData: Stationrates = {
            jan: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            feb: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            mar: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            apr: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            may: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            jun: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            jul: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            aug: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            sep: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            oct: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            nov: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
            },
            dec: {
              crime_clearance_rate: getRandomInteger(30, 80),
              crime_rate: getRandomInteger(10, 50),
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
    };

    fetchData();
  }, [stationId, year]);

  return { data, loading, error };
};

export default useStationRates;
