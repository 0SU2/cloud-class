import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2f0K5-o65yX0K4-I2p9OLLYIWZ77aD50",
    authDomain: "kanban-a9c98.firebaseapp.com",
    projectId: "kanban-a9c98",
    storageBucket: "kanban-a9c98.firebasestorage.app",
    messagingSenderId: "953357102044",
    appId: "1:953357102044:web:9fbb8a7630e6baa9debd19"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)

  export {auth, db}