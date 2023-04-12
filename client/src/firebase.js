// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCyTbMiIZNd-KB88nfx1Y3pfzzsmAtRlFk",
  authDomain: "dolarillo-71983.firebaseapp.com",
  databaseURL: "https://dolarillo-71983-default-rtdb.firebaseio.com",
  projectId: "dolarillo-71983",
  storageBucket: "dolarillo-71983.appspot.com",
  messagingSenderId: "136878297993",
  appId: "1:136878297993:web:6b71fe533d1ae804d6c758"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); // exporto variable con metodo getAuth y le asigno mis valores creados desde sitio firebase
export const db = getFirestore(app); // idem anterior
export const googleProvider = new GoogleAuthProvider(); // idem anterior
export default app;
