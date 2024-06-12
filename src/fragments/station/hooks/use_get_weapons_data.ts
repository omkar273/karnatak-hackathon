import { firestore } from "@/firebase/firebase_config";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { useCallback, useState } from "react";

interface GetAllStationWeaponsVehiclesData {
  initialLimit?: number;
  stationId?: string | null | undefined;
  data?: "weapons" | "vehicles";
}

function useGetAllStationWeaponsVehiclesData<T>({
  initialLimit = 10,
  stationId,
  data = "weapons",
}: GetAllStationWeaponsVehiclesData = {}): {
  documents: T[];
  fetchData: (newPage?: boolean) => Promise<void>;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
} {
  const [documents, setDocuments] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(
    async (newPage = false) => {
      setLoading(true);
      setError(null);

      try {
        console.log("starting to get weapons data");

        // Base query
        const baseQuery = collection(
          firestore,
          data === "weapons" ? "weapons" : "vehicle_details"
        );
        let q = query(baseQuery, limit(initialLimit));

        // Add stationId filter if provided
        if (stationId) {
          q = query(q, where("station_id", "==", stationId));
        }

        // Add pagination if newPage and lastDoc are set
        if (newPage && lastDoc) {
          q = query(q, startAfter(lastDoc));
        }

        const querySnapshot = await getDocs(q);
        const fetchedDocuments: T[] = [];
        let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

        querySnapshot.forEach((doc) => {
          fetchedDocuments.push({ ...doc.data(), id: doc.id } as T);
          lastVisible = doc;
        });

        setDocuments((prevDocs) =>
          newPage ? [...prevDocs, ...fetchedDocuments] : fetchedDocuments
        );
        setLastDoc(lastVisible);
        setHasMore(fetchedDocuments.length >= initialLimit);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [initialLimit, stationId, data, lastDoc]
  );

  return { documents, fetchData, loading, error, hasMore };
}

export default useGetAllStationWeaponsVehiclesData;
