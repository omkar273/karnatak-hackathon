import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TaskType } from "../modals/fir_modal";

const useGetFirDetails = (firID: string | undefined | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); // Default empty error message
  const [data, setData] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!firID) {
          setError("FIR ID is null or undefined.");
          return;
        }

        setLoading(true);
        const docRef = doc(firestore, "fir_details", firID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data() as TaskType);
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
  }, [firID]);

  return { loading, error, data };
};

export default useGetFirDetails;
