import { auth, firestore } from "@/firebase/firebase_config";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export const doSignUp = async ({
  username,
  email,
  password,
}: SignUpData): Promise<void> => {
  try {
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
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const doLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error logging out:", error);
  }
};
