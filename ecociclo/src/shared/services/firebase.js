import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf3HEhJ7Yj_Z1brmdUk88Cr4QTvPhHwxo",
  authDomain: "ecociclo-266c1.firebaseapp.com",
  databaseURL: "https://ecociclo-266c1-default-rtdb.firebaseio.com",
  projectId: "ecociclo-266c1",
  storageBucket: "ecociclo-266c1.firebasestorage.app",
  messagingSenderId: "505130684171",
  appId: "1:505130684171:web:32ee1a2059173c428c9c0e",
  measurementId: "G-XCE0FWTYFB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
