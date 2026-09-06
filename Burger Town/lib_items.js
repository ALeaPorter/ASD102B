"use strict";

class Item {
    #price = 0;
    constructor(type, size, price = 0) {
        this.type = type;
        this.size = size;
        this.#price = price;
    }
    get price() {
        return this.#price;
    }
}

class Burger extends Item {
    #toppings = null;
    constructor(type, size) {
        // set default type annd size
        if (type == "") type = "regular";
        if (size == "") size = "single";

        // determine price
        let price = 5.00;

        if (type == "cheese") {
            price += 1.0;
        }

        if (size == "double") {
            price += 2.0;
        }

        // call superclass constructor
        super(type, size, price);

        //initialize private property
        this.#toppings = [];
    }

    addTopping(topping) {
        this.#toppings.push(topping);
    }

    get toppings() {
        return this.#toppings.slice();  // return a copy
    }

    toString() {
        // replace 'regular' so displays either 'burger' or 'cheeseburger'
        return `${this.size} ${this.type.replace("regular", "")}burger - $${this.price.toFixed(2)}`;
    }
}

class Drink extends Item {
    constructor(type, size) {
        // set default type annd size
        if (type == "") type = "water";
        if (size == "") size = "small";

        if (type == "water") {
            // call superclass constructor, use default price of zero
            super(type, size);
        } else {
            // determine price
            let price = 2.0;

            if (type == "soda") {
                price += 1.0;
            }

            if (size == "medium") {
                price += 0.5;
            } else if (size == "large") {
                price += 0.75;
            }

            // call superclass constructor
            super(type, size, price);
        }
    }

    toString() {
        return `${this.size} ${this.type} $${this.price.toFixed(2)}`;
    }
}

class Fries extends Item {
    constructor(type, size) {
        // set default type annd size
        if (type == "") type = "regular";
        if (size == "") size = "small";

        // determine price
        let price = 2.50;

        if (type == "curly") {
            price += 0.5;
        }

        if (size == "medium") {
            price += 0.5;
        } else if (size == "large") {
            price += 0.75;
        }

        // call superclass constructor
        super(type, size, price);
    }

    toString() {
        // replace 'regular' so displays either 'fries' or 'curly fries'
        return `${this.size} ${this.type.replace("regular", "")} fries - $${this.price.toFixed(2)}`;
    }
}