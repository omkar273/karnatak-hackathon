import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NotificationData } from "../utils/send_notification";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebase_config";

const useFetchNotifications = ({
  userId,
}: {
  userId: string | undefined | null;
}): {
  notifications: NotificationData[];
  loading: boolean;
  error: string | null;
} => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(firestore, "notifications"),
      where("recepient_id", "==", userId),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsList = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as NotificationData;
        });
        console.log(notificationsList);
        setNotifications(notificationsList);
        setLoading(false);
      },
      (err) => {
        setError(`Error fetching notifications: ${err.message}`);
        toast.error(`Error fetching notifications: ${err.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { notifications, loading, error };
};

export default useFetchNotifications;
