import { firestore } from "@/firebase/firebase_config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetDocument = <T>({
  docId,
  path,
}: {
  docId: string | undefined | null;
  path: string;
}): {
  loading: boolean;
  error: string;
  data: T | null;
} => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        if (!docId) {
          setError("station id is null or undefined.");
          return;
        }

        setLoading(true);
        const docRef = doc(firestore, path, docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data() as T);
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
  }, [docId, path]);

  return { loading, error, data };
};

export default useGetDocument;
