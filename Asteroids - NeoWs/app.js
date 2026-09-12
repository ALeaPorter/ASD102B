"use strict";

const getElement = (selector) => document.querySelector(selector);

const proxy = "https://cors-anywhere.herokuapp.com/";
const domain = "https://api.nasa.gov/neo/rest/v1/";
const apiKey = "eRngqcrcyar57JPN4aOdM5J11rZajapvWmTUkyPN";

const createElement = (tagName, text = null) => {
    const element = document.createElement(tagName);
    if (text) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    return element;
}

const formatDate = (daysFromToday = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toISOString().split("T")[0];
};

const displayAsteroids = (asteroids) => {
    const tbody = getElement("#list tbody");
    tbody.textContent = "";

    for (let asteroid of asteroids) {
        const name = createElement("td", asteroid.name);

        const closeApproachData = asteroid.close_approach_data || [];
        const closeApproach = closeApproachData[0];

        const date = createElement("td", closeApproach ? closeApproach.close_approach_date : "Unknown");
        const minMeters = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min);
        const maxMeters = Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max);
        const diameter = createElement("td", `${minMeters} - ${maxMeters}`);

        const hazardous = createElement("td", asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No");

        const row = createElement("tr");
        row.appendChild(name);
        row.appendChild(date);
        row.appendChild(diameter);
        row.appendChild(hazardous);

        tbody.appendChild(row);
    }
};

const getFeed = async () => {
    const startDate = formatDate(0);
    const endDate = formatDate(1);
    const url = `${proxy}${domain}feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const asteroids = Object.values(data.near_earth_objects).flat();

    displayAsteroids(asteroids);
};

const getBrowse = async () => {
    const url = `${proxy}${domain}browse?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    displayAsteroids(data.near_earth_objects);
};

document.addEventListener("DOMContentLoaded", () => {
    getElement("#feedLink").addEventListener("click", async (evt) => {
        evt.preventDefault();
        await getFeed();
    });
    getElement("#browseLink").addEventListener("click", async (evt) => {
        evt.preventDefault();
        await getBrowse();
    });
});