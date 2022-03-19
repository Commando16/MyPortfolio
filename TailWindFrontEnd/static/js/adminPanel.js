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



// event listener
    // menu
    document.getElementById("menuButtonProfile").addEventListener("click",controllerDisplay);
    document.getElementById("menuButtonToolRecommendation").addEventListener("click",controllerDisplay);
    document.getElementById("menuButtonBlog").addEventListener("click",controllerDisplay);
    
    // profile 
    document.getElementById("reviewImageInp").addEventListener("change",changeProfilePicture);
    document.getElementById("changePasswordSubmitBtn").addEventListener("click",changeAdminPassword);
    
// event listener end





// functions 

function changeProfilePicture(){
    alert("hello event fired");
}

function changeAdminPassword(){
    let renewPasswordInp = document.getElementById("renewPasswordInp");
    let renewPasswordInpValue = renewPasswordInp.value;
    
    if(renewPasswordInpValue.length > 0){
        update(ref(db, "AdminCredential/"), {
            adminPassword: renewPasswordInpValue,
        })
        .then(() => {
            alert("password changes successfully");
        })
        .catch((error) => {
            console.log(error);
            alert("error aa gai h user entry");
        });

    }
    else{
        alert("empty field");
    }

    renewPasswordInp.value = "";
}

function controllerDisplay(){
    // alert(this.dataset.controllerBoxName);
    let targetedControllerId = this.dataset.controllerBoxName; // because data set contain the exact id of targeted element
    let controllerContainerArray = document.getElementsByClassName("controllerContainer");

    for( let containerItr of controllerContainerArray){
        // console.log(containerItr);
        containerItr.classList.remove("block");
        containerItr.classList.add("hidden");
    }

    // console.log(document.getElementById(targetedControllerId));
    document.getElementById(targetedControllerId).classList.remove("hidden");
    document.getElementById(targetedControllerId).classList.add("block");
}


// functions end


