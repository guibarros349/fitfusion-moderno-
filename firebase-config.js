import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNr6pNrWBl1jawI9utddf_wT7Qnukj0w0",
  authDomain: "fitfusion-5b727.firebaseapp.com",
  projectId: "fitfusion-5b727",
  storageBucket: "fitfusion-5b727.appspot.com",
  messagingSenderId: "9889974134",
  appId: "1:9889974134:web:874fe5c5633e88f7191c57",
  measurementId: "G-QJNWVCX4SE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, doc, setDoc, getDoc };