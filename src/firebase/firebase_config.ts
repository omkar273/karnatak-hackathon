import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu8MBVvRZjMjpWeLSHrpmK42HFM4ql2UE",
  authDomain: "ksp-hacks.firebaseapp.com",
  projectId: "ksp-hacks",
  storageBucket: "ksp-hacks.appspot.com",
  messagingSenderId: "974002204476",
  appId: "1:974002204476:web:8393332f58f15aac827839",
  measurementId: "G-0C46Y76C22",
};
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
