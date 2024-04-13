import { firestore } from "@/firebase/firebase_config";
import { UserModel } from "@/fragments/user_management/models/user_model";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useUserData = (userUid: string | null | undefined): UserModel | null => {
  const [userData, setUserData] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userUid === null || userUid === undefined) {
          return null;
        }

        const docRef = doc(firestore, "users", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data) {
            setUserData(data as UserModel);
          }
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [userUid]);

  return userData;
};

export default useUserData;
