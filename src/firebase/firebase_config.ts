import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtsqIHYmI7O3UDWpIo9Y1yam0RvUGKdf0",
  authDomain: "ksp-hackathon-2968d.firebaseapp.com",
  projectId: "ksp-hackathon-2968d",
  storageBucket: "ksp-hackathon-2968d.appspot.com",
  messagingSenderId: "371659584706",
  appId: "1:371659584706:web:e27051fb33c3a4437c775b",
  measurementId: "G-6GV20CTBYN",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
