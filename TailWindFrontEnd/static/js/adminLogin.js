let userInp = document.getElementById("userInp");
let passwordInp = document.getElementById("passwordInp");

document.getElementById("loginButton").addEventListener("click",adminLogin);
function adminLogin(){
    userInpValue = userInp.value.trim();
    passwordInpValue = passwordInp.value;

    if( userInpValue.length === 0 ){
        alert("admin name field empty");
    }
    else if(passwordInpValue.length === 0){
        alert("password field cannot be empty");
    }
    console.log(userInpValue+" "+passwordInpValue);
}