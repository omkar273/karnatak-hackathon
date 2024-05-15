// useUserCounts.ts
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";

interface StationCounts {
  cases_registered: number;
  pending_cases: number;
  closed_cases: number;
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
  userUid: string,
  monthYear: string = getCurrentMonthYear()
): UseStationCountsResult => {
  const [data, setData] = useState<StationCounts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const docRef = doc(firestore, `users/${userUid}/counts/${monthYear}`);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as StationCounts);
        } else {
          const initialData: StationCounts = {
            cases_registered: 0,
            pending_cases: 0,
            closed_cases: 0,
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
  }, [userUid, monthYear]);

  return { data, loading, error };
};

export default useStationCounts;
