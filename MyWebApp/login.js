"use strict";
const getElement = selector => document.querySelector(selector);

const showLoginDiv = () => {
    getElement("#login").classList.remove("hide");
    getElement("#user").focus();
}
const hideLoginDiv = () => {
    getElement("#login").classList.add("hide");
    getElement("#user").value = "";
    getElement("#message").textContent = "";
}

const showLogoutDiv = () => {
    getElement("#logout").classList.remove("hide");
    getElement("#btn_logout").focus();
}
const hideLogoutDiv = () => {
    getElement("#logout").classList.add("hide");
    getElement("#name").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    // On load, show correct <div> element based on user value
    if (localStorage.user) {
        hideLoginDiv();
        showLogoutDiv();
        getElement("#name").textContent = localStorage.user;
    }
    else {
        hideLogoutDiv();
        showLoginDiv();
    }
    // Add event listener for logout button
    getElement("#btn_logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        hideLogoutDiv();
        showLoginDiv();
    });
    // Add event listener for login button
    getElement("#btn_login").addEventListener("click", () => {
        const user = getElement("#user").value;
        if (user) {
            localStorage.setItem("user", user);
            hideLoginDiv();
            showLogoutDiv();
            getElement("#name").textContent = user;
        }
        else {
            // Display error message if username is empty
            getElement("#message").textContent = "Please enter a username.";
            getElement("#user").focus();
        }
    });
});