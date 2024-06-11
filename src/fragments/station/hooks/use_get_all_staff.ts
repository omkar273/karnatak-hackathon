import { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase_config";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  startAfter,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { UserModel } from "@/fragments/user_management/models/user_model";

interface UseGetAllStaffParams {
  stationId: string | null | undefined;
  initialLimit?: number;
  posts?: string[]; // Accept an array of strings for posts
}

const useGetAllStaff = ({
  initialLimit = 5,
  stationId,
  posts = [],
}: UseGetAllStaffParams) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [staff, setStaff] = useState<UserModel[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);

  const fetchStaff = async (
    limitSize: number,
    startAfterDoc: DocumentData | null = null
  ) => {
    try {
      if (!stationId) {
        throw new Error("Station ID is null or undefined.");
      }

      console.log(`station id is ${stationId}`);

      const staffQuery = startAfterDoc
        ? query(
            collection(firestore, "users"),
            where("stationId", "==", stationId),
            where("post", "in", posts),
            limit(limitSize),
            startAfter(startAfterDoc)
          )
        : query(
            collection(firestore, "users"),
            where("stationId", "==", stationId),
            where("post", "in", posts),
            limit(limitSize)
          );

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        staffQuery
      );

      const newStaff = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserModel[];

      setStaff((prevStaff) => [...prevStaff, ...newStaff]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setStaff([]);
    setLastDoc(null);
    fetchStaff(initialLimit);
  }, [stationId, initialLimit]);

  const fetchMore = () => {
    if (lastDoc) {
      fetchStaff(initialLimit, lastDoc);
    }
  };

  return { loading, error, staff, fetchMore };
};

export default useGetAllStaff;
