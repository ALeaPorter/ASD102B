"use strict";
// global variables 
let timer = null;
let eventName = "";
let eventDate = null;

const getElement = selector => document.querySelector(selector);

const displayCountdown = () => {
    const today = new Date();

    // get number of seconds between dates 
    let seconds = (eventDate.getTime() - today.getTime()) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    // round down seconds
    seconds = Math.floor(seconds);

    getElement("#message").textContent = `${days} day(s), 
        ${hours} hours, ${minutes} minutes, ${seconds} seconds 
        until ${eventName} (${eventDate.toDateString()})`;
};

document.addEventListener("DOMContentLoaded", () => {

    getElement("#countdown").addEventListener("click", () => {
        // stop any previous timer
        clearInterval(timer);

        eventName = getElement("#event").value;           // use global variable
        const eventDateString = getElement("#date").value;  
        const messageLbl = getElement("#message");  

        // make sure user entered event and date 
        if (eventName == "" || eventDateString == "") {
            messageLbl.textContent = "Please enter both a name and a date.";
            return;
        }

        // convert event date string to Date object and check for validity
        eventDate = new Date(eventDateString);           // use global variable
        if (eventDate.toString() == "Invalid Date") {
            messageLbl.textContent = "Please enter a valid date.";
            return;
        }

        // calculate days
        const today = new Date();
        const msFromToday = eventDate.getTime() - today.getTime();  
        const msForOneDay = 24 * 60 * 60 * 1000; // hrs * mins * secs * milliseconds  
        const daysToDate = Math.ceil( msFromToday / msForOneDay );       

        // create and display message 
        const displayDate = eventDate.toDateString();                                      
        if (daysToDate == 0) {
            messageLbl.textContent = `Hooray! Today is ${eventName}! (${displayDate})`;
        } else if (daysToDate > 0) {
            displayCountdown();
            timer = setInterval(displayCountdown, 1000);  // 1000 ms = 1 second
        } else if (daysToDate < 0) {
            messageLbl.textContent = `${eventName} happened ${Math.abs(daysToDate)} 
                day(s) ago. (${displayDate})`;
        }
    });

    // set focus on first text box
    getElement("#event").focus();
});