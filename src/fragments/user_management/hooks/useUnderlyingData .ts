import { firestore } from "@/firebase/firebase_config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UnderlyingModel } from "../models/underlying_model";

const useUnderlyingData = (userId: string) => {
  const [data, setData] = useState<UnderlyingModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUnderlyingData = async () => {
      try {
        const underlyingRef = collection(
          firestore,
          `users/${userId}/underlying`
        );
        const querySnapshot = await getDocs(underlyingRef);
        const underlyingData = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as UnderlyingModel)
        );
        setData(underlyingData);
      } catch (error) {
        console.error("Error fetching underlying data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUnderlyingData();
    }
  }, [userId]);

  return { data, loading };
};

export default useUnderlyingData;
