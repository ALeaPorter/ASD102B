"use strict";

const getElement = selector => document.querySelector(selector);

const domain = "https://jsonplaceholder.typicode.com";

const createElement = (tagName, text = null) => {
    const element = document.createElement(tagName);
    if (text) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    return element;
};

const displayUsers = async () => {
    const response = await fetch(`${domain}/users`);
    const users = await response.json();

    const select = getElement("#users");
    for (let user of users) {
        const option = createElement("option", user.name);
        option.value = user.id;
        select.appendChild(option);
    }
};

const displayTodos = async (id) => {
    const response = await fetch(`${domain}/todos/?userId=${id}`);
    const list = await response.json();

    const tbody = getElement("#list tbody");
    tbody.textContent = "";  // clear

    for (let todo of list) {
        const title = createElement("td", todo.title);
        const completed = createElement("td", todo.completed ? "true" : "false");
        const row = createElement("tr");
        row.appendChild(title);
        row.appendChild(completed);
        tbody.appendChild(row);
    }
};

document.addEventListener("DOMContentLoaded", async() => {
    // load <select> element
    await displayUsers();

    // display to-do items for first user in <select> element
    await displayTodos(getElement("#users").value);

    // event handler for <select> change event
    getElement("#users").addEventListener("change", async (evt) => {
        await displayTodos(evt.currentTarget.value);
    });
 });