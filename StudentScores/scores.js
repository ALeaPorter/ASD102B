"use strict";

const getElement = selector => document.querySelector(selector);

const displayScores = scores => {   
    // filter scores
    const minScore = Number(getElement("#filter").value);

    const filteredScores = scores.filter(entry => entry[2] >= minScore);
    // sort filtered scores
    const sortBy = getElement("#sort").value;
    if (sortBy === "fname") {
        filteredScores.sort((a, b) => a[0].localeCompare(b[0]));
    }
    else if (sortBy === "lname") {
        filteredScores.sort((a, b) => a[1].localeCompare(b[1]));
    }
    else if (sortBy === "score") {
        filteredScores.sort((a, b) => a[2] - b[2]);
    }
    // get total of filtered scores and build display string
    let total = 0;
    let displayString = "";
    filteredScores.forEach(entry => {
        displayString += entry[0] + ", " + entry[1] + ", " + entry[2] + "\n";
        total += entry[2];
    });
    // calculate the average 
    const avg = filteredScores.length > 0 ? total / filteredScores.length : 0;
    // display
    getElement("#score_list").value = displayString;
    getElement("#avg").textContent = avg.toFixed(2);
};

document.addEventListener("DOMContentLoaded", () => {
    const scores = [];
    getElement("#add_score").addEventListener("click", () => {
        const firstName = getElement("#first_name").value;
        const lastName = getElement("#last_name").value;
        const score = parseFloat(getElement("#score").value);
        
        scores.push([firstName, lastName, score]);

        displayScores(scores);

        getElement("#first_name").value = "";
        getElement("#last_name").value = "";
        getElement("#score").value = "";
    });
    
    getElement("#clear_scores").addEventListener("click", () => {
        scores.length = 0;
        displayScores(scores);
        getElement("#first_name").focus();
    });

    getElement("#sort").addEventListener("change", () => {
        displayScores(scores);
    });
    
    getElement("#filter").addEventListener("change", () => {
        displayScores(scores);
    });

    // set focus on first text box on load
    getElement("#first_name").focus();
});