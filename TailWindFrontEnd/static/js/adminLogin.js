let userInp = document.getElementById("userInp");
let passwordInp = document.getElementById("passwordInp");

document.getElementById("loginButton").addEventListener("click",adminLogin);
function adminLogin(){
    userInpValue = userInp.value.trim();
    passwordInpValue = passwordInp.value;

    console.log(userInpValue+" "+passwordInpValue);
}