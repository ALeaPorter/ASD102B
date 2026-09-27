"use strict";
const getElement = selector => document.querySelector(selector);

const setStatus = text => getElement("#status").textContent = text;

const startGame = () => {
    const game = new Game(getElement("canvas"));
    setStatus(`${game.currentPlayer}'s turn`);
    return game;
}

document.addEventListener("DOMContentLoaded", () => {
    let game = startGame();

    // event handler for canvas click event
    getElement("canvas").addEventListener("click", evt => {
        // get x and y coords on board when mouse is clicked
        const x = evt.offsetX;
        const y = evt.offsetY;
       
        game.takeTurn(x, y);

        if (game.checkWinner()) {
            setStatus(`${game.winner} wins!`);
        } else if (game.isDraw) {
            setStatus("Draw!");
        } else {
            setStatus(`${game.currentPlayer}'s turn`);
        }
    });

    // event handler for New Game button click event
    getElement("#new_game").addEventListener("click", () => {
        game = startGame();
    });
});