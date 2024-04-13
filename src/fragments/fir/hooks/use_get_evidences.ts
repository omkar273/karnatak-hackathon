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
import { FirEvidenceTypeModal } from "../modals/fir_evidence_model";

interface UseFetchFirProgress {
  evidenceList: FirEvidenceTypeModal[];
  loading: boolean;
  error: Error | null | string;
}

const useFetchFirEvidences = (
  firId: string | null | undefined,
  reload: boolean
): UseFetchFirProgress => {
  const [evidenceList, setEvidenceList] = useState<FirEvidenceTypeModal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | string>(null);
  const fetchEvidences = async () => {
    try {
      if (!firId) {
        setError("FIR ID is null or undefined.");
        return;
      }

      const q = query(
        collection(firestore, "fir_details", firId, "evidences"),
        orderBy("date", "asc")
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs
        .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...(doc.data() as FirEvidenceTypeModal),
        }))
        .sort((a: FirEvidenceTypeModal, b: FirEvidenceTypeModal) => {
          // Convert date strings from dd/mm/yyyy to Date objects to sort
          const dateA = convertToDate(a.date);
          const dateB = convertToDate(b.date);
          return dateA.getTime() - dateB.getTime();
        });

      setEvidenceList(data);
      setLoading(false);
    } catch (err) {
      setError(`${err}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvidences();
    return () => {};
  }, [firId, reload]);

  return { evidenceList, loading, error };
};

const convertToDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
};

export default useFetchFirEvidences;
