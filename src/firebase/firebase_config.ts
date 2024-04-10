import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm34pfCKk1N_c0QOZl4nwKuhXCCO2UNDA",
  authDomain: "capital-tech-fintech.firebaseapp.com",
  projectId: "capital-tech-fintech",
  storageBucket: "capital-tech-fintech.appspot.com",
  messagingSenderId: "729233128912",
  appId: "1:729233128912:web:03285c24359c6cc05d4dd5",
  measurementId: "G-F830K5T2PZ",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
