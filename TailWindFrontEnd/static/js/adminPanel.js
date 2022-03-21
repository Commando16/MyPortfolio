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
fetchAllBlogs();
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

    if( addToolNameInp.value.trim() === "" ){
        alert("tool name field cannot be empty");
    }else if( addToolUrlInp.value.trim() === ""){
        alert("tool url field cannot be empty");
    }else if( addToolDescriptionInp.value.trim() === ""){
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
                toolUrl: addToolUrlInp.value.trim(),
                toolDescription: addToolDescriptionInp.value.trim(),
            })
            .then(() => {
                console.log("tool added successfully");
                updateToolSerialCount(currentToolSerialNumber+1);

                // emptying the fields
                addToolNameInp.value = "";
                addToolUrlInp.value = "";
                addToolDescriptionInp.value = "";

                // calling fetchAllTools to refresh the tool history list
                fetchAllTools()
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

// function to delete tool
// window.deleteTool Because onclick dosent work in module type of js 
window.deleteTool = function(elementObj){
    let toolIdToBeDeleted = elementObj.dataset.toolId;
    //alert(toolIdToBeDeleted);

    // console.log("deleteToolFunction");
    remove(child(databaseRef, "Tools/"+toolIdToBeDeleted))
    .then(() => { 
        console.log("tool successfully deleted");
        
        // calling fetchAllTools to refresh the tool history list
        fetchAllTools();
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h all tool delete krne m");
    });
}
// end

// function to edit tool
// window.deleteTool Because onclick dosent work in module type of js
window.editTool = function(elementObj){
    let toolIdToBeEdited = elementObj.dataset.toolId;
    //alert(toolIdToBeEdited+" is to be edited");
    let editToolIdLabel = document.getElementById("editToolIdLabel");
    let editToolNameInp = document.getElementById("editToolNameInp");
    let editToolUrlInp = document.getElementById("editToolUrlInp");
    let editToolDescriptionInp = document.getElementById("editToolDescriptionInp");
    let editToolSubmitBtn = document.getElementById("editToolSubmitBtn");


    get(child(databaseRef, "Tools/"+toolIdToBeEdited))
    .then((snapshot) => { 
        editToolIdLabel.innerHTML = toolIdToBeEdited;
        editToolNameInp.value = snapshot.val().toolName;
        editToolUrlInp.value = snapshot.val().toolUrl;
        editToolDescriptionInp.value = snapshot.val().toolDescription;

        // binding click event with proper value in editToolSubmitBtn button
        editToolSubmitBtn.addEventListener("click", finalEditTool);
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h edit tool fetch krne m");
    });
}
// end

function finalEditTool(){
    let editToolIdLabel = document.getElementById("editToolIdLabel");
    
    let editToolNameInp = document.getElementById("editToolNameInp");
    let editToolUrlInp = document.getElementById("editToolUrlInp");
    let editToolDescriptionInp = document.getElementById("editToolDescriptionInp");
    let editToolSubmitBtn = document.getElementById("editToolSubmitBtn");

    let toolIdToBeEdited = editToolIdLabel.innerHTML;
    // alert(toolIdToBeEdited+" is the final edit");

    if( editToolNameInp.value.trim() === "" ){
        alert("edit tool name field cannot be empty");
    }else if( editToolUrlInp.value.trim() === ""){
        alert("edit tool url field cannot be empty");
    }else if( editToolDescriptionInp.value.trim() === ""){
        alert("edit tool description field cannot be empty");        
    }
    else{
        update(ref(db, "Tools/" + toolIdToBeEdited), {
            toolName: editToolNameInp.value.trim(),
            toolUrl: editToolUrlInp.value.trim(),
            toolDescription: editToolDescriptionInp.value.trim(),
        })
        .then(() => {
            console.log("tool edited successfully");

            // emptying the fields
            editToolNameInp.value = "";
            editToolUrlInp.value = "";
            editToolDescriptionInp.value = "";

            // calling fetchAllTools to refresh the tool history list
            fetchAllTools()
        })
        .catch((error) => {
            console.log(error);
            console.log("error aa gai h tool entry m");
        });
    }

    
}

// function to fetch and display all tools in DB
function fetchAllTools(){
    let historyOfToolInnerBox = document.getElementById("historyOfToolInnerBox");
    let historyOfToolInnerBoxInnerHtmlDynamic = "";

    historyOfToolInnerBox.innerHTML = 
    `<img class="controllerLoadingGifs self-center hidden" src="../static/images/loading/loadingAnimation.gif" alt="" id="historyOfToolLoadingGif"></img>`;

    loadingGifVisibilityToggle( "historyOfToolLoadingGif", "show");
    get(child(databaseRef, "Tools"))
    .then((snapshot) => { 
        snapshot.forEach((child) =>{
            // console.log(child.val());
            historyOfToolInnerBoxInnerHtmlDynamic = historyOfToolInnerBoxInnerHtmlDynamic+
            `<div class="toolRow w-full p-2 bg-black/[0.2] rounded-lg my-2">`+
                `<span class="toolId text-xl text-white mx-1">${child.val().toolId}</span>`+
                `<span class="toolId text-xl text-white mx-1 w-full">${child.val().toolName}</span>`+
                `<button class="controllersButtons bg-blue-600 hover:bg-blue-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-tool-id="${child.val().toolId}" onclick="editTool(this)"> Edit </button>`+
                `<button class="controllersButtons bg-rose-600 hover:bg-rose-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-tool-id="${child.val().toolId}" onclick="deleteTool(this)"> Delete </button>`+
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

                // calling fetchAllBlogs to refresh the blog history list
                fetchAllBlogs();
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

// function to delete blog
window.deleteBlog = function(elementObj){
    let blogIdToBeDeleted = elementObj.dataset.blogId;
    // alert(blogIdToBeDeleted);

    // console.log("deleteToolFunction");
    
    remove(child(databaseRef, "Blogs/"+blogIdToBeDeleted))
    .then(() => { 
        console.log("blog successfully deleted");
        
        // calling fetchAllBlogs to refresh the blog history list
        fetchAllBlogs();
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h all blog delete krne m");
    });
    
}
// end

// function to fetch all blog history
function fetchAllBlogs(){
    let historyOfBlogInnerBox = document.getElementById("historyOfBlogInnerBox");
    let historyOfBlogInnerBoxInnerHtmlDynamic = "";

    historyOfBlogInnerBox.innerHTML = 
    `<img class="controllerLoadingGifs self-center hidden" src="../static/images/loading/loadingAnimation.gif" alt="" id="historyOfBlogLoadingGif"></img>`;

    loadingGifVisibilityToggle( "historyOfBlogLoadingGif", "show");

    get(child(databaseRef, "Blogs"))
    .then((snapshot) => { 
        snapshot.forEach((child) =>{
            // console.log(child.val());
            historyOfBlogInnerBoxInnerHtmlDynamic = historyOfBlogInnerBoxInnerHtmlDynamic+
            `<div class="toolRow w-full p-2 bg-black/[0.2] rounded-lg my-2">`+
                `<span class="toolId text-xl text-white mx-1">${child.val().blogId}</span>`+
                `<span class="toolId text-xl text-white mx-1 w-full">${child.val().blogTitle}</span>`+
                `<button class="controllersButtons bg-blue-600 hover:bg-blue-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-blog-id="${child.val().blogId}" onclick="editBlog(this)"> Edit </button>`+
                `<button class="controllersButtons bg-rose-600 hover:bg-rose-700 text-xl text-white font-medium rounded-full px-4 py-1 mx-1" data-blog-id="${child.val().blogId}" onclick="deleteBlog(this)"> Delete </button>`+
            `</div>`;
        });     
        historyOfBlogInnerBox.innerHTML = historyOfBlogInnerBox.innerHTML + historyOfBlogInnerBoxInnerHtmlDynamic;

        loadingGifVisibilityToggle( "historyOfBlogLoadingGif", "hide");
    })
    .catch((error) => {
        console.log(error);
        console.log("error aa gai h all tool fetch krne m");
    });

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


