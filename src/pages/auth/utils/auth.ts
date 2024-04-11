/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, firestore } from "@/firebase/firebase_config";
import { UserModel } from "@/fragments/user-registartion/pages/register_page";
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
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type SignUpData = {
  username: string;
  email: string;
  password: string;
  data: UserModel;
};

export const doSignUp = async ({
  username,
  email,
  password,
  data,
}: SignUpData): Promise<void> => {
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
      await addDoc(collection(firestore, "usernames"), {
        email,
        username,
      });

      await setDoc(doc(firestore, "users", creds.user.uid), data);
    }
  } catch (error) {
    throw new Error(`Error signing up: ${error}`);
  }
};

export const doLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error logging out:", error);
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
