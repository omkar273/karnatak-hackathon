/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, firestore } from "@/firebase/firebase_config";
import { UserModel } from "@/fragments/user_management/models/user_model";
import { FirebaseError } from "firebase/app";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

type SignUpData = {
  username: string;
  email: string;
  password: string;
  data: UserModel;
};

export const doLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(`error logging out: ${error}`);
  }
};

export const doLogin = async (
  username: string,
  password: string
): Promise<UserCredential | undefined> => {
  try {
    const q = query(
      collection(firestore, "usernames"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Username not found");
    }

    const userEmail = querySnapshot.docs[0].data().email;

    const user = await signInWithEmailAndPassword(auth, userEmail, password);
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-credential") {
        throw new Error(`Invalid username or password`);
      }
      throw new Error(`${error.message}`);
    } else {
      throw new Error(`${error}`);
    }
  }
};

export const saveUserData = async (
  userId: string,
  email: string,
  username: string,
  data: UserModel
): Promise<void> => {
  await addDoc(collection(firestore, "usernames"), { email, username });

  const userRef = doc(firestore, "users", userId);
  await setDoc(userRef, data);

  if (data.stationId && data.department) {
    const stationRef = doc(
      firestore,
      "station_user_department_counts",
      data.stationId
    );

    const stationDoc = await getDoc(stationRef);

    if (stationDoc.exists()) {
      await updateDoc(stationRef, {
        [data.department]: increment(1),
      });
    } else {
      await setDoc(stationRef, {
        [data.department]: 1,
      });
    }
  }
};

export const doSignUp = async ({
  username,
  email,
  password,
  data,
}: SignUpData): Promise<string> => {
  try {
    const q = query(
      collection(firestore, "usernames"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Username already taken");
    }

    const creds: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (creds) {
      await saveUserData(creds.user.uid, email, username, data);
    }
    return creds?.user?.uid ?? "";
  } catch (error) {
    throw new Error(`Error signing up: ${error}`);
  }
};
