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

// Inital function call
showToolCards()
// Inital function call end


// functions

function showToolCards(){

    let rightParentBox = document.getElementById("rightParentBox")
    let rightParentBoxInnerHtml = "";

    rightParentBox.innerHTML = rightParentBoxInnerHtml;

    get(child(databaseRef, "Tools"))
    .then((snapshot) => { 

        snapshot.forEach(child => {
            rightParentBoxInnerHtml+=
            `<!-- tool card -->`+
            `<div class="toolCard glassMorph rounded-[16px] p-4 relative m-2">`+
            `<!-- rating -->`+
            `<p>`+
                `<span class="ratingText text-2xl text-white/[0.9] mx-1">${child.val().toolRating}</span>`+
                `<span class="ratingText text-2xl mx-1">&#11088</span>`+
            `</p>`+
            `<!-- rating end -->`+
            `<!-- card image -->`+
            `<div class="flex justify-center">`+
                `<img class="cardImage glassMorph rounded-full my-4" src="../static/images/brandImages/keyframes_app.png" alt="">` +
            `</div>`+
            `<!-- card image end -->`+
            `<!-- card text -->`+
            `<p class="text-2xl text-white/[0.9] text-center font-medium justify-center my-4">${child.val().toolName}</p>`+
            `<p class="text-xl text-white/[0.9] font-medium text-center justify-center">learning curve: <br>${child.val().toolLearningCurve}</p>`+
            `<!-- card text end -->`+
            `<!-- card visit buttton -->`+
            `<a class="visitButton glassMorph text-2xl text-white/[0.9] rounded-full px-8 py-1 absolute" href="${child.val().toolUrl}"> visit </a>`+
            `<!-- card visit buttton end -->`+
            `</div>`+
            `<!-- tool card -->`;
        });
        

        rightParentBox.innerHTML = rightParentBoxInnerHtml;
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h edit tool fetch krne m");
    });
    
}

// functions end