"use strict"
// ###################################################
const logoutBtn = document.getElementById("logoutBtn");

if(localStorage.getItem('username')== null){
    window.location = "index.html";
}

let username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").innerHTML = "Welcome " + username;
}
logoutBtn.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
}