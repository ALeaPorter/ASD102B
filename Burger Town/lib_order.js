"use strict";

class Order {
    #burgers = null;
    #drinks = null;
    #fries = null;

    constructor() {
        this.#burgers = [];
        this.#drinks = [];
        this.#fries = [];
    }

    get total() {
        let orderTotal = 0.0;

        orderTotal += this.#burgers.reduce((total, item) => total + item.price, 0.0);
        orderTotal += this.#drinks.reduce((total, item) => total + item.price, 0.0);
        orderTotal += this.#fries.reduce((total, item) => total + item.price, 0.0);

        return orderTotal;
    }

    add(item) {
        if (item instanceof Burger) 
            this.#burgers.push(item);
        else if (item instanceof Drink)
            this.#drinks.push(item);
        else if (item instanceof Fries)
            this.#fries.push(item);
    }

    clear() {
        this.#burgers.length = 0;
        this.#drinks.length = 0;
        this.#fries.length = 0;
    }

    display(div) {
        div.textContent = "";  // clear previous display

        // burgers
        this.#burgers.forEach(burger => {
            const elem = document.createElement("h4");
            const text = document.createTextNode(burger);
            elem.appendChild(text);
            div.appendChild(elem);
        
            const toppingsList = document.createElement("ul");
            burger.toppings.forEach(topping => {
                const li = document.createElement("li");
                const text = document.createTextNode(topping);
                li.appendChild(text);
                toppingsList.appendChild(li);
            });
            div.appendChild(toppingsList)
        });

        // drinks
        this.#drinks.forEach(drink => {
            const elem = document.createElement("h4");
            const text = document.createTextNode(drink);
            elem.appendChild(text);
            div.appendChild(elem);
        });

        // fries
        this.#fries.forEach(fry => {
            const elem = document.createElement("h4");
            const text = document.createTextNode(fry);
            elem.appendChild(text);
            div.appendChild(elem);
        });

        // total
        const elem = document.createElement("h2");
        const text = document.createTextNode(`Total: $${this.total.toFixed(2)}`);
        elem.appendChild(text);
        div.appendChild(elem);
    }
}