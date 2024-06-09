import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-9ITAT5WnekjUNECQ8R_Nks67Rm5ML4s",
  authDomain: "ksp-hack-4dfc7.firebaseapp.com",
  projectId: "ksp-hack-4dfc7",
  storageBucket: "ksp-hack-4dfc7.appspot.com",
  messagingSenderId: "473580362423",
  appId: "1:473580362423:web:0532b25d21ce114a7dcb32",
  measurementId: "G-HFK5S0CJYF",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
