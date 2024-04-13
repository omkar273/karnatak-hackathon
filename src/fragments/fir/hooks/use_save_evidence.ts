import { firestore } from "@/firebase/firebase_config";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { FirProgressTypeModal } from "../modals/fir_progress_modal";

const useSaveFirEvidence = () => {
  const [savingLoading, setLoading] = useState<boolean>(false);
  const [evidenceError, setError] = useState<Error | null | string>(null);

  const saveEvidence = async (
    firId: string | null | undefined,
    progressData: FirProgressTypeModal
  ) => {
    try {
      if (!firId) {
        setError("Fir Not found");
        return;
      }

      setLoading(true);
      setError(null);
      const firDocRef = doc(firestore, "fir_details", firId);
      const progressColRef = collection(firDocRef, "evidences");
      await addDoc(progressColRef, {
        ...progressData,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unexpected error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    savingLoading,
    evidenceError,
    saveEvidence,
  };
};

export default useSaveFirEvidence;
