import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXoRK9jI5LOf4y1oni0xkOfgHaTczKCaw",
  authDomain: "truthlens-45191.firebaseapp.com",
  projectId: "truthlens-45191",
  storageBucket: "truthlens-45191.firebasestorage.app",
  messagingSenderId: "215046500433",
  appId: "1:215046500433:web:9a50d8cbf37a00c4904870",
  measurementId: "G-KXSR8JZTCP"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);