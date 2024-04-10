import { firestore } from '@/firebase/firebase_config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type UserData = {
    name: string | null;
    email: string | null;
    username: string | null;
    policeId: string | null;
};

const useUserData = (userUid: string | null | undefined): UserData | null => {



    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userUid === null || userUid === undefined) {
                    return null;
                }

                console.log(`user id is ${userUid}`);


                const docRef = doc(firestore, 'users', userUid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data) {
                        const { name, email, username, policeId } = data;
                        setUserData({ name, email, username, policeId });
                    }
                } else {
                    console.log("No such document!");
                    setUserData(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData(null);
            }
        };

        fetchUserData();
    }, [userUid]);

    return userData;
};

export default useUserData;
