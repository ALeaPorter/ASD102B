"use strict";
const getElement = selector => document.querySelector(selector);

const setMessage = text => getElement("#message").textContent = text;

const startGame = () => {
    const gamePiece = new GamePiece(getElement("#game_piece"));
    const game = new Game(getElement("#game_board"), gamePiece);
    setMessage(`${game.gamePiece.color}'s Turn`);
    return game;
};

document.addEventListener("DOMContentLoaded", () => {
    let game = startGame();

    getElement("#game_board").addEventListener("dragover", evt => evt.preventDefault());

    getElement("#game_board").addEventListener("drop", (evt) => {
        evt.preventDefault();
        
        const x = evt.offsetX;  // x coordinate of where game piece is dropped
        game.takeTurn(x);

        if (game.checkWinner()) {
            setMessage(`${game.winner} wins!`);
        } else if (game.isDraw) {
            setMessage("Draw!");
        } else {
            setMessage(`${game.gamePiece.color}'s Turn`);
        }
    });

    getElement("#new_game").addEventListener("click", () => {
        game = startGame();
    });
});