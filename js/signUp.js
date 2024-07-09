"use strict"
// ###################################################
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signUpBtn = document.getElementById("signUpBtn");

const nameRegex = /^[a-z\sA-Z]{3,15}$/;
const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let signUpArray =
    localStorage.getItem("users") == null
        ? []
        : JSON.parse(localStorage.getItem("users"));

signUpBtn.addEventListener("click", signUp);
signupName.addEventListener("input", () => {
    validate(signupName, nameRegex);
});
signupEmail.addEventListener("input", () => {
    validate(signupEmail, emailRegex);
});

signupPassword.addEventListener("input", () => {
    validate(signupPassword, passwordRegex);
});

function isEmpty() {
    return (
        signupName.value == "" ||
        signupEmail.value == "" ||
        signupPassword.value == ""
    );
}

function isEmailExist() {
    for (const element of signUpArray) {
        if (element.email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true;
        }
    }
}

function isValid() {
    return (
        nameRegex.test(signupName.value) &&
        emailRegex.test(signupEmail.value) &&
        passwordRegex.test(signupPassword.value)
    );
}
function validate(element, regex) {
    let testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }
}
function signUp() {
    if (isEmpty()) {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }
    if (isValid()) {
        let signUp = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        };

        if (isEmailExist()) {
            document.getElementById("exist").innerHTML =
                '<span class="text-danger m-3">email already exists</span>';
        } else {
            signUpArray.push(signUp);
            localStorage.setItem("users", JSON.stringify(signUpArray));
            document.getElementById("exist").innerHTML =
                '<span class="text-success m-3">Success</span>';
            window.location = "index.html";
        }
    }
}