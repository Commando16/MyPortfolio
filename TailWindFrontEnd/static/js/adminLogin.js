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

let userInp = document.getElementById("userInp");
let passwordInp = document.getElementById("passwordInp");

document.getElementById("loginButton").addEventListener("click", adminLogin);
function adminLogin() {
    let userInpValue = userInp.value.trim();
    let passwordInpValue = parseInt(passwordInp.value);

    if (userInpValue.length === 0) {
        alert("admin name field empty");
    }
    else if (passwordInpValue.length === 0) {
        alert("password field cannot be empty");
    }

    console.log(userInpValue + " " + passwordInpValue);

    get(child(databaseRef, "AdminCredential/")).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            console.log(snapshot.val().adminName);
            console.log(snapshot.val().adminPassword);

            if ((userInpValue === snapshot.val().adminName) && (passwordInpValue === snapshot.val().adminPassword)) {
                window.location.href = "adminPanel.html";
            }
            else {
                alert("wrong username or password");
            }
        }
    });
}