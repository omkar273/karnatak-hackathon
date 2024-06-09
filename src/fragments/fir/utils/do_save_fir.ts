import { firestore } from "@/firebase/firebase_config";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { FIRRecord } from "../modals/fir_modal";

// Helper function to get the current month in "YYYY-MM" format
const getCurrentMonth = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is 2 digits
  return `${year}-${month}`;
};

export const doSaveFIR = async (firData: FIRRecord): Promise<boolean> => {
  try {
    // Save the FIR record in the fir_details collection
    const firDocRef = await addDoc(collection(firestore, "fir_details"), {
      ...firData,
      timestamp: serverTimestamp(),
    });

    const firId = firDocRef.id;

    if (firData.stationId) {
      const stationDocRef = doc(firestore, "stations", firData.stationId);
      const currentMonth = getCurrentMonth();

      // Update FIR count in the fir_counts subcollection
      const firCountDocRef = doc(
        collection(stationDocRef, "fir_counts"),
        currentMonth
      );
      const firCountSnapshot = await getDoc(firCountDocRef);
      if (!firCountSnapshot.exists()) {
        await setDoc(firCountDocRef, {
          cases_registered: 1,
          cases_open: 1,
          cases_closed: 0,
        });
      } else {
        await updateDoc(firCountDocRef, {
          cases_registered: increment(1),
          cases_open: increment(1),
        });
      }

      // Update FIR type count in the fir_type_count subcollection
      if (firData.fir_type) {
        const firTypeCountDocRef = doc(
          collection(stationDocRef, "fir_type_count"),
          currentMonth
        );
        const firTypeCountSnapshot = await getDoc(firTypeCountDocRef);
        if (!firTypeCountSnapshot.exists()) {
          await setDoc(firTypeCountDocRef, { [firData.fir_type]: 1 });
        } else {
          await updateDoc(firTypeCountDocRef, {
            [firData.fir_type]: increment(1),
          });
        }
      }
    }

    // Iterate over the allotedTo field and update each user's task list and task count
    if (firData.allotedTo) {
      for (const allocation of firData.allotedTo) {
        const userDocRef = doc(firestore, "users", allocation.id);

        // Add the FIR to the user's tasks subcollection
        await addDoc(collection(userDocRef, "tasks"), {
          ...firData,
          firId,
        });

        // Update task count in the task_count subcollection
        const taskCountDocRef = doc(
          collection(userDocRef, "task_count"),
          getCurrentMonth()
        );

        
        const taskCountSnapshot = await getDoc(taskCountDocRef);
        if (!taskCountSnapshot.exists()) {
          await setDoc(taskCountDocRef, {
            tasks_registered: 1,
            tasks_open: 1,
            tasks_pending: 0,
            tasks_closed: 0,
          });
        } else {
          await updateDoc(taskCountDocRef, {
            tasks_registered: increment(1),
            tasks_open: increment(1),
          });
        }

        // Update overall task type counts
        const taskTypeCountDocRef = doc(
          collection(userDocRef, "task_type_counts"),
          getCurrentMonth()
        );
        const taskTypeCountSnapshot = await getDoc(taskTypeCountDocRef);
        if (!taskTypeCountSnapshot.exists()) {
          await setDoc(taskTypeCountDocRef, {
            fir: 1,
            patrolling: 0,
            evidence_collection: 0,
          });
        } else {
          await updateDoc(taskTypeCountDocRef, {
            fir: increment(1),
          });
        }
      }
    }

    return true;
  } catch (error) {
    console.log("Error storing FIR details:", error);
    return false;
  }
};
