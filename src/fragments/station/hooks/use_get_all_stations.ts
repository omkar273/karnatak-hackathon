import { firestore } from "@/firebase/firebase_config";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { StationModel } from "../models/station_model";

// Hook return type
interface UseFIRsReturn {
  documents: StationModel[];
  fetchStations: (newPage?: boolean) => Promise<void>;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
}

interface GetAllStationsParams {
  timeFrame?: "thisMonth" | "lastMonth" | "thisYear" | "all";
  initialLimit?: number;
  comesUnder?: string;
}

function getTimeFrameTimestamps(
  frame: "thisMonth" | "lastMonth" | "thisYear" | "all"
): {
  start: Timestamp;
  end: Timestamp;
} {
  const now = new Date();
  let start: Date | Timestamp = new Date(),
    end: Date | Timestamp = new Date();

  switch (frame) {
    case "thisMonth":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "lastMonth":
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    case "thisYear":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    case "all":
      start = Timestamp.fromDate(new Date(1970, 0, 1));
      end = Timestamp.now();
      break;
    default:
      throw new Error("Invalid time frame specified.");
  }

  // Ensure conversion to Firestore Timestamp for consistency in queries
  start = start instanceof Date ? Timestamp.fromDate(start) : start;
  end = end instanceof Date ? Timestamp.fromDate(end) : end;

  return { start, end };
}

function useGetAllStations({
  timeFrame = "all",
  initialLimit = 2,
  comesUnder,
}: GetAllStationsParams = {}): UseFIRsReturn {
  const [documents, setDocuments] = useState<StationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchStations = useCallback(
    async (newPage = false) => {
      setLoading(true);
      setError(null);

      try {
        const { start, end } = getTimeFrameTimestamps(timeFrame);
        let q = query(
          collection(firestore, "stations"),
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp"),
          limit(initialLimit)
        );

        if (comesUnder) {
          q = query(q, where("comesUnder", "==", comesUnder));
        }

        if (newPage && lastDoc) {
          q = query(q, startAfter(lastDoc));
        }

        const querySnapshot = await getDocs(q);
        const fetchedDocuments: StationModel[] = [];
        let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as StationModel;
          fetchedDocuments.push({ ...data, id: doc.id });
          lastVisible = doc;
        });

        setDocuments((prevDocs) =>
          newPage ? [...prevDocs, ...fetchedDocuments] : fetchedDocuments
        );
        setLastDoc(lastVisible);
        setHasMore(fetchedDocuments.length >= initialLimit);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [timeFrame, initialLimit, lastDoc]
  );

  return { documents, fetchStations, loading, error, hasMore };
}

export default useGetAllStations;
