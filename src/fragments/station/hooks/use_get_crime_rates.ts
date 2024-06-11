import { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase_config";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { FirTypeCount } from "@/types/station_crime_count_type";

interface UseGetCrimeRatesParams {
  stationId: string | null | undefined;
  year: string;
  month?: string;
}

const useGetCrimeRates = ({
  stationId,
  year,
  month,
}: UseGetCrimeRatesParams) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [crimeRates, setCrimeRates] = useState<FirTypeCount[]>([]);
  let isInitialized = false;

  const fetchCrimeRates = async () => {
    try {
      if (!stationId) {
        throw new Error("Station ID is null or undefined.");
      }

      const crimeRatesData: FirTypeCount[] = [];

      if (month) {
        console.log("inside if condition");
        console.log(month);

        const docId = `${year}-${month}`;
        const docRef = doc(
          firestore,
          `stations/${stationId}/fir_type_count`,
          docId
        );
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        console.log(docSnap.exists());
        if (docSnap.exists()) {
          crimeRatesData.push({
            id: docSnap.id,
            ...(docSnap.data() as FirTypeCount),
          });
        } else {
          throw new Error("No such document!");
        }
      } else {
        console.log("inside else condition");

        const crimeRateList = await getDocs(
          query(
            collection(firestore, `stations/${stationId}/fir_type_count`),
            where(documentId(), ">=", `${year}-01`),
            where(documentId(), "<=", `${year}-12`),
            limit(150)
          )
        );

        console.log("showinf firs");

        crimeRateList.docs.map((doc) => console.log(doc.data()));
        crimeRateList.docs.map((doc) => {
          crimeRates.push({
            id: doc.id,
            ...(doc.data() as FirTypeCount),
          });
        });
      }

      setCrimeRates(crimeRates);
      console.log(`settings crime rates with station id ${stationId}`);
      console.log(crimeRates);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      isInitialized = !false;
      setLoading(true);
      setCrimeRates([]);
      fetchCrimeRates();
    }
  }, [stationId, year, month]);

  return { loading, error, crimeRates };
};

export default useGetCrimeRates;
