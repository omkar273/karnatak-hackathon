import { firestore } from "@/firebase/firebase_config";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirProgressTypeModal } from "../modals/fir_progress_modal";

interface UseFetchFirProgress {
  progressList: FirProgressTypeModal[];
  loading: boolean;
  error: Error | null | string;
}

const useFetchFirProgress = (
  firId: string | null | undefined,
  reload: boolean
): UseFetchFirProgress => {
  const [progressList, setProgressList] = useState<FirProgressTypeModal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | string>(null);
  const fetchProgress = async () => {
    try {
      if (!firId) {
        setError("FIR ID is null or undefined.");
        return;
      }

      const q = query(
        collection(firestore, "fir_details", firId, "progress"),
        orderBy("date", "asc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs
        .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...(doc.data() as FirProgressTypeModal),
        }))
        .sort((a: FirProgressTypeModal, b: FirProgressTypeModal) => {
          // Convert date strings from dd/mm/yyyy to Date objects to sort
          const dateA = convertToDate(a.date);
          const dateB = convertToDate(b.date);
          return dateA.getTime() - dateB.getTime();
        });

      setProgressList(data);
      setLoading(false);
    } catch (err) {
      setError(`${err}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProgress();
    return () => {};
  }, [firId, reload]);

  return { progressList, loading, error };
};

const convertToDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
};

export default useFetchFirProgress;
