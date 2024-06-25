import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const authENV = process.env.REACT_APP_FIREBASE_AUTH;
const config = JSON.parse(authENV);

const app = initializeApp(config);
export const firebaseAuth = getAuth(app);
export const provider = new GoogleAuthProvider();