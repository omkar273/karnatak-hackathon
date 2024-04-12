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

// FIR Document Interface
export interface FIRDocument {
  id: string;
  name: string;
  fatherName: string;
  mobileNo: string;
  emailAddress: string;
  presentAddress: string;
  dateOfIncident: string;
  timeOfIncident: string;
  placeOfIncident: string;
  detailsOfIncident: string;
  timestamp: Timestamp;
}

// Hook return type
interface UseFIRsReturn {
  documents: FIRDocument[];
  fetchFIRs: (newPage?: boolean) => Promise<void>;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
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
      start = Timestamp.fromDate(new Date(1970, 0, 1)); // Firestore timestamp for 'beginning of time'
      end = Timestamp.now(); // Current timestamp
      break;
    default:
      throw new Error("Invalid time frame specified.");
  }

  // Ensure conversion to Firestore Timestamp for consistency in queries
  start = start instanceof Date ? Timestamp.fromDate(start) : start;
  end = end instanceof Date ? Timestamp.fromDate(end) : end;

  return { start, end };
}

function useGetAllFIRs(
  timeFrame: "thisMonth" | "lastMonth" | "thisYear" | "all",
  initialLimit = 15
): UseFIRsReturn {
  const [documents, setDocuments] = useState<FIRDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchFIRs = useCallback(
    async (newPage = false) => {
      setLoading(true);
      setError(null);
      console.log(`calling function again with timefrmae ${timeFrame} `);

      try {
        const { start, end } = getTimeFrameTimestamps(timeFrame);
        let q = query(
          collection(firestore, "fir_details"),
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp"),
          limit(initialLimit)
        );

        if (newPage && lastDoc) {
          q = query(q, startAfter(lastDoc));
        }

        const querySnapshot = await getDocs(q);
        const fetchedDocuments: FIRDocument[] = [];
        let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as FIRDocument;
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

  return { documents, fetchFIRs, loading, error, hasMore };
}

export default useGetAllFIRs;
