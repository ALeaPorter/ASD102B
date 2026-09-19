"use strict";

const scores = [];

//Display scores
const displayScores = () => scores.join(", ");

//Calculate average score
const calculateAverage = () => {
    const total = scores.reduce((tot, curr) => tot + parseInt(curr), 0);
    const avg = total / scores.length;
    return avg;
};

//Iterate starting at index 2, until end of the arguments make sure to account for NaN
for (let i = 2; i < process.argv.length; i++) {
    if (isNaN(process.argv[i])) {
        console.log("Scores must be numbers.");
        process.exit();
    }
    scores.push(process.argv[i]);
};

//Enforce at least one score
if (scores.length === 0) {
    console.log("Must enter scores.")
}

console.log(`All Scores: ${displayScores()}`);
console.log(`Average of Test Scores: ${calculateAverage()}`);