"use strict";
const getElement = selector => document.querySelector(selector);

const uncheckAll = () => {
    const inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        if (input.checked) input.checked = false;
    }
};

const getCheckedValue = selector => {
    let value = "";
    const inputs = document.querySelectorAll(selector);
    for (let input of inputs) {
        if (input.checked) value = input.value;
    };
    return value;
};

document.addEventListener("DOMContentLoaded", () => {
    let order = new Order();

    getElement("#add_order").addEventListener("click", () => {
        let type = "";
        let size = "";

        //Add burger
        type = getCheckedValue("input[name='burger_type']");
        size = getCheckedValue("input[name='burger_size']");

        if (type || size) {
            const burger = new Burger(type, size);
            const toppings = document.querySelectorAll("#toppings input");
            for (let topping of toppings) {
                if (topping.checked) burger.addTopping(topping.value);
            }
            order.add(burger);
        }

        //Add drink
        type = getCheckedValue("input[name='drink_type']");
        size = getCheckedValue("input[name='drink_size']");

        if (type || size) {
            const drink = new Drink(type, size);
            order.add(drink);
        }

        //Add fries
        type = getCheckedValue("input[name='fry_type']");
        type = getCheckedValue("input[name='fry_size']");

        if (type || size) {
            const fries = new Fries(type, size);
            order.add(fries);
        }

        //Display order and clear form
        const orderDetailsDiv = getElement("#order_details");
        order.display(orderDetailsDiv);
        uncheckAll();
    }); 

    getElement("#clear_order").addEventListener("click", () => {
        uncheckAll();
        order.clear();
        getElement("#order_details").textContent = "";
    });
    
}); 