// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

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

// 
// 
// 
// 
// 

// event listener ---------------------------------------------------------------
// menu
document.getElementById("menuButtonProfile").addEventListener("click", controllerDisplay);
document.getElementById("menuButtonToolRecommendation").addEventListener("click", controllerDisplay);
document.getElementById("menuButtonBlog").addEventListener("click", controllerDisplay);

// profile 
document.getElementById("reviewImageInp").addEventListener("change", changeProfilePicture);
document.getElementById("changePasswordSubmitBtn").addEventListener("click", changeAdminPassword);

// tools
document.getElementById("addToolSubmitBtn").addEventListener("click", addTool);

// blogs
document.getElementById("addBlogSubmitBtn").addEventListener("click", addBlog);

// event listener end ------------------------------------------------------------

//
// 
// 
// 
// 

// initial function call -----------------------------------------------------
fetchAllTools();
// initial function call end -------------------------------------------------

//
// 
// 
// 
// 

// functions ------------------------------------------------------------

function changeProfilePicture() {
    alert("hello event fired");
}

// function to change admin password
function changeAdminPassword() {
    let renewPasswordInp = document.getElementById("renewPasswordInp");
    let renewPasswordInpValue = renewPasswordInp.value;

    if (renewPasswordInpValue.length > 0) {
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
    else {
        alert("empty field");
    }

    renewPasswordInp.value = "";
}
//end

// function to switch between different section(controller section) { profile, tool, blog }
function controllerDisplay() {
    // alert(this.dataset.controllerBoxName);
    let targetedControllerId = this.dataset.controllerBoxName; // because data set contain the exact id of targeted element
    let controllerContainerArray = document.getElementsByClassName("controllerContainer");

    for (let containerItr of controllerContainerArray) {
        // console.log(containerItr);
        containerItr.classList.remove("block");
        containerItr.classList.add("hidden");
    }

    // console.log(document.getElementById(targetedControllerId));
    document.getElementById(targetedControllerId).classList.remove("hidden");
    document.getElementById(targetedControllerId).classList.add("block");
}
// end

// function to add new tool
function addTool() {
    let addToolNameInp = document.getElementById("addToolNameInp");
    let addToolUrlInp = document.getElementById("addToolUrlInp");
    let addToolDescriptionInp = document.getElementById("addToolDescriptionInp");

    if( addToolNameInp.value === "" ){
        alert("tool name field cannot be empty");
    }else if( addToolUrlInp.value === ""){
        alert("tool url field cannot be empty");
    }else if( addToolDescriptionInp.value === ""){
        alert("tool description field cannot be empty");        
    }
    else{
        get(child(databaseRef, "SerialCount/toolSerialCount"))
        .then((snapshot) => { 
            let currentToolSerialNumber = snapshot.val();
            let newToolId = currentToolSerialNumber + 1;
            // console.log(currentToolSerialNumber+ "is the current tool serial count");

            set(ref(db, "Tools/" + newToolId), {
                toolId: newToolId,
                toolName: addToolNameInp.value.trim(),
                toolUrl: addToolUrlInp.value,
                toolDescription: addToolDescriptionInp.value,
            })
            .then(() => {
                console.log("tool added successfully");
                updateToolSerialCount(currentToolSerialNumber+1);

                // emptying the fields
                addToolNameInp.value = "";
                addToolUrlInp.value = "";
                addToolDescriptionInp.value = "";
            })
            .catch((error) => {
                console.log(error);
                console.log("error aa gai h tool entry m");
            });
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h toolSerialCount fetch krne m");
        });
    }
}
// end

// function to fetch and display all tools in DB
function fetchAllTools(){
    let historyOfToolInnerBox = document.getElementById("historyOfToolInnerBox");
    let historyOfToolInnerBoxInnerHtmlDynamic = "";

    loadingGifVisibilityToggle( "historyOfToolLoadingGif", "show");
    get(child(databaseRef, "Tools"))
        .then((snapshot) => { 
            snapshot.forEach((child) =>{
                // console.log(child.val());
                historyOfToolInnerBoxInnerHtmlDynamic = historyOfToolInnerBoxInnerHtmlDynamic+
                `<div class="toolRow w-full p-2 bg-black/[0.2] rounded-lg my-2">`+
                    `<span class="toolId text-xl text-white mx-1">${child.val().toolId}</span>`+
                    `<span class="toolId text-xl text-white mx-1 w-full">${child.val().toolName}</span>`+
                    `<button class="controllersButtons bg-blue-600 hover:bg-blue-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-tool-id="${child.val().toolId}"> Edit </button>`+
                    `<button class="controllersButtons bg-rose-600 hover:bg-rose-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-tool-id="${child.val().toolId}"> Delete </button>`+
                `</div>`;
            });     
            historyOfToolInnerBox.innerHTML = historyOfToolInnerBox.innerHTML + historyOfToolInnerBoxInnerHtmlDynamic;

            loadingGifVisibilityToggle( "historyOfToolLoadingGif", "hide");
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h all tool fetch krne m");
        });
}
// end

// function to add new blog
function addBlog() {    
    let addBlogTitleInp = document.getElementById("addBlogTitleInp");
    let addBlogTextInp = document.getElementById("addBlogTextInp");

    if( addBlogTitleInp.value === "" ){
        alert("tool name field cannot be empty");
    }else if( addBlogTextInp.value === ""){
        alert("tool url field cannot be empty");
    }else {
        get(child(databaseRef, "SerialCount/blogSerialCount"))
        .then((snapshot) => { 
            let currentBlogSerialNumber = snapshot.val();
            let newBlogId = currentBlogSerialNumber + 1;
            console.log(currentBlogSerialNumber+ "is the current tool serial count");
            
            set(ref(db, "Blogs/" + newBlogId), {
                blogId: newBlogId,
                blogTitle: addBlogTitleInp.value.trim(),
                blogText: addBlogTextInp.value.trim(),
            })
            .then(() => {
                console.log("blog added successfully");
                updateBlogSerialCount(currentBlogSerialNumber+1);

                // emptying the fields
                addBlogTitleInp.value = "";
                addBlogTextInp.value = "";
            })
            .catch((error) => {
                console.log(error);
                console.log("error aa gai h blog entry m");
            });
            
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h blogSerialCount fetch krne m");
        });
    }
}
// end

// update tools Serial Count
function updateToolSerialCount( updatedToolCount ){
    update(ref(db, "SerialCount"), {
        toolSerialCount: updatedToolCount,
    })
    .then(() => {
        console.log("tool serialCount updated successfully");
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h tool serial count update m");
    });    
}
// end

// update tools Serial Count
function updateBlogSerialCount( updatedBlogCount ){
    update(ref(db, "SerialCount"), {
        blogSerialCount: updatedBlogCount,
    })
    .then(() => {
        console.log("blog serialCount updated successfully");
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h blog serial count update m");
    });    
}
// end

// function to toggle loading gif visibility
function loadingGifVisibilityToggle( gifId, visibilityStatus){
    let loadingGif = document.getElementById(gifId);

    if( visibilityStatus === "hide" ){
        loadingGif.classList.remove("block");
        loadingGif.classList.add("hidden");
    }
    else if(visibilityStatus === "show"){
        loadingGif.classList.remove("hidden");
        loadingGif.classList.add("block");
    }
}
// function end


// functions end -------------------------------------------------------


