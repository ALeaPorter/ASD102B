"use strict";

class Game {
    #turnCount = null;
    #ctx = null;
    #gameBoard = null;

    constructor(canvas) {
        this.currentPlayer = "X";
        this.winner = null;
        this.#turnCount = 0;

        // Drawing context
        this.#ctx = canvas.getContext("2d");
        this.#ctx.font = "60px derif"  // Game font

        //Logical representation of game board
        this.#gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];

        this.#drawBoard(canvas.width, canvas.height);
    }

    #drawBoard(canvasWidth, canvasHeight) {
        //Clear canvas
        this.#ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const len = 100;

        //Add squares
        this.#ctx.strokeRect(0, 0, len, len);
        this.#ctx.strokeRect(0, 200, len, len);
        this.#ctx.strokeRect(200, 0, len, len);
        this.#ctx.strokeRect(200, 200, len, len);
        this.#ctx.strokeRect(100, 100, len, len);

        //Outer border
        this.#ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    #drawMark(x, y, row, col) {
        //Draw only if no marks on board
        if (this.#gameBoard[row][col] == "") {
            this.#ctx.fillText(this.currentPlayer, x, y);
            //Store, turn count, switch player
            this.#gameBoard[row][col] = this.currentPlayer;
            this.#turnCount++;
            this.currentPlayer = (this.currentPlayer == "X") ?  "O" : "X";
        }
    }

    #isWinner(marks) {
        if (marks.every(m => m == "X") || marks.every(m => m == "O")) {
            this.winner = marks[0];
            return true;
        }
    }

    get isDraw() {
        return this.#turnCount == 9;
    }

    takeTurn(x, y) {
        //No turn if winner
        if (this.winner) return;

        if (x < 100 && y < 100) {
            this.#drawMark(30, 70, 0, 0);
        } else if (x < 200 && y < 100) {
            this.#drawMark(130, 70, 0, 1);
        } else if (x < 300 && y < 100) {
            this.#drawMark(230, 70, 0, 2);
        } else if (x < 100 && y < 200) {
            this.#drawMark(30, 170, 1, 0);
        } else if (x < 200 && y < 200) {
            this.#drawMark(130, 170, 1, 1);
        } else if (x < 300 && y < 200) {
            this.#drawMark(230, 170, 1, 2);
        } else if (x < 100 && y < 300) {
            this.#drawMark(30, 270, 2, 0);
        } else if (x < 200 && y < 300) {
            this.#drawMark(130, 270, 2, 1);
        } else if (x < 400 && y < 300) {
            this.#drawMark(230, 270, 2, 2);
        }
    }

    checkWinner() {
        //Check rows
        for (let row of this.#gameBoard) {
            if (this.#isWinner(row)) return true;
        }
        //Check columns
        for (let i in this.#gameBoard){
            const column = [this.#gameBoard[0][i], this.#gameBoard[1][i], this.#gameBoard[2][i]]
            if (this.#isWinner(column)) return true;
        }

        //Check diagonal1
        let diag = [this.#gameBoard[0][0], this.#gameBoard[1][1], this.#gameBoard[2][2]];
        if (this.#isWinner(diag)) return true;

        //Check diagonal2
        diag = [this.#gameBoard[2][0], this.#gameBoard[1][1], this.#gameBoard[0][2]];
        if (this.#isWinner(diag)) return true;

        return false;
    }
}