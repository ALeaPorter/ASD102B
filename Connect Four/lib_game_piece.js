"use strict";

class GamePiece {
    #ctx = null;
    #color = null;

    constructor(canvas) {
        this.#ctx = canvas.getContext("2d");

        this.#setColor();  //sets initial color to Red
        this.#draw();
    }

    #setColor() {
        this.#color = (this.#color == "Red") ? "Yellow" : "Red";
    }

    #draw() {
        this.#ctx.fillStyle = this.#color;
        this.#ctx.arc(40, 40, 39, 0, Math.PI*2);
        this.#ctx.stroke();
        this.#ctx.fill();
    }

    get color() {
        return this.#color;
    }

    redraw() {
        this.#ctx.clearRect(0, 0,
            this.#ctx.canvas.width, this.#ctx.canvas.height);  //clear previous
        this.#setColor();                                      //toggle color
        this.#draw();
    }
}