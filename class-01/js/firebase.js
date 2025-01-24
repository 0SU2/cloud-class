  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

const firebaseConfig = {
  // DO NOT UPLOAD YOUR KEYS!!!
  apiKey: "AIzaSyAg9VGTZdcHcQWBASK73a8QHTkg3yNwh-4",
  authDomain: "cloud-clas.firebaseapp.com",
  projectId: "cloud-clas",
  storageBucket: "cloud-clas.firebasestorage.app",
  messagingSenderId: "714289528545",
  appId: "1:714289528545:web:c121858543a264684dc1a0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);