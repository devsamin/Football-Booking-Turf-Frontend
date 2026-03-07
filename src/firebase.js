import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwtzl8wp03OpGB7yjx2-_SBOk2z_j_hbk",
  authDomain: "football-turf.firebaseapp.com",
  projectId: "football-turf",
  appId: "1:724659035478:web:abd44524e77991a6a14af7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
