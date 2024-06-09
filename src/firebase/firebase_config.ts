import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASg7dUFEtwrW9Pgw8137eJeXbh7-hGDj4",
  authDomain: "ksp-hackathon-737ce.firebaseapp.com",
  projectId: "ksp-hackathon-737ce",
  storageBucket: "ksp-hackathon-737ce.appspot.com",
  messagingSenderId: "191084596598",
  appId: "1:191084596598:web:0c2d59b84a0d956b1f3e57",
  measurementId: "G-47041Z3WW2",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
