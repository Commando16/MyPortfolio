// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove }
      from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4zJ0NCOOYkU59TaHjELEsuRsQxa2agGk",
  authDomain: "myportfolio-4d46b.firebaseapp.com",
  databaseURL: "https://myportfolio-4d46b-default-rtdb.firebaseio.com",
  projectId: "myportfolio-4d46b",
  storageBucket: "myportfolio-4d46b.appspot.com",
  messagingSenderId: "806942262739",
  appId: "1:806942262739:web:4df37f1497c90361b3db26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const databaseRef = ref(db);