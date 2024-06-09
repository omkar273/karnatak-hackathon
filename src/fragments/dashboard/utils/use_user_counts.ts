// useUserCounts.ts
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { getRandomInteger } from "@/utils/random_no";

interface UserCounts {
  cases_registered: number;
  pending_cases: number;
  closed_cases: number;
  cases_alloted_to_me: number;
}

interface UseUserCountsResult {
  data: UserCounts | null;
  loading: boolean;
  error: string | null;
}

const getCurrentMonthYear = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with leading zero if necessary
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const useUserCounts = (
  userUid: string | null | undefined,
  monthYear: string = getCurrentMonthYear()
): UseUserCountsResult => {
  const [data, setData] = useState<UserCounts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userUid === undefined || userUid === null) {
        return;
      }
      setLoading(true);
      setError(null);

      const docRef = doc(firestore, `users/${userUid}/counts/${monthYear}`);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as UserCounts);
        } else {
          const initialData: UserCounts = {
            cases_registered: getRandomInteger(0, 23),
            pending_cases: getRandomInteger(5, 12),
            closed_cases: getRandomInteger(6, 20),
            cases_alloted_to_me: getRandomInteger(3, 20),
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

export default useUserCounts;
