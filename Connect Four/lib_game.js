"use strict";

class Game {
    #ctx = null;
    #gameBoard = null;

    constructor(canvas, gamePiece) {
        this.gamePiece = gamePiece;
        this.winner = null;

        this.#ctx = canvas.getContext("2d");

        //Board representation
        this.#gameBoard = [
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
            ["","","","","","",""],
        ];

        this.#drawBoard(canvas.width, canvas.height);
    }

    #drawBoard(canvasWidth, canvasHeight) {
        this.#ctx.beginPath();

        //Draw blue board
        this.#ctx.fillStyle = "blue";
        this.#ctx.strokeRect(0, 30, canvasWidth, canvasHeight);
        this.#ctx.fillRect(0, 30, canvasWidth, canvasHeight);

        //Draw empty circles
        for (let y in this.#gameBoard) {
            for (let x in this.#gameBoard[y]) {
                this.#ctx.moveTo((x*100)+50, (y*100)+90);
                this.#ctx.arc((x*100)+50, (y*100)+90, 40, 0, Math.PI*2)
                this.#ctx.fillStyle = "white";
                this.#ctx.stroke();
                this.#ctx.fill();
            }
        }

        //Draw tabs
        for (let x = 0; x <= this.#gameBoard[0].length; x++) {
            this.#ctx.beginPath();
            this.#ctx.fillStyle = "blue";

            this.#ctx.moveTo((x*100)-10, 20);
            this.#ctx.fillRect((x*100)-10, 20, 20, 10);
        }
    }

    #addToColumn(col) {
        //Get index of lowest row
        let row = -1;
        for (let i = this.#gameBoard.length - 1; i >= 0 ; i--) {
            if (this.#gameBoard[i][col] == "") {
                row = i;
                break;
            }
        }
        //Don't add if column full
        if (row == -1) return;

        //Store Color
        this.#gameBoard[row][col] = this.gamePiece.color;

        this.#ctx.fillStyle = this.gamePiece.color;
        this.#ctx.beginPath();
        this.#ctx.moveTo((col*100)+50, (row*100)+90);
        this.#ctx.arc((col*100)+50, (row*100)+90, 40, 0, Math.PI*2)
        this.#ctx.stroke();
        this.#ctx.fill();

        this.gamePiece.redraw();
    }

    #isWinner(state, row, col) {
        if (state.color == this.#gameBoard[row][col] && state.color != "") {
            state.count++;
            if (state.count == 4) {
                this.winner = state.color;
                return true;
            }
        } else {
            state.color = this.#gameBoard[row][col];
            state.count = (state.color == "") ? 0 : 1;
            return false;
        }
    }
    #isLeftToRightWinner(state, row, col) {
        while (row < this.#gameBoard.length && col < firstRow.length) {
            if (this.#isWinner(state, row, col)) return true;
            col++;
            row++;
        }
        return false;
    }
    #isRightToLeftWinner(state, row, col) {
        while (row < this.#gameBoard.length && col >= 0) {
            if (this.#isWinner(state, row, col)) return true;
            col--;
            row++;
        }
        return false;   //no diagonal winner
    }

    takeTurn(x) {
        //Don't take turn if there's winner or draw
        if (this.winner || this.isDraw) return;

        if (x < 100) {
            this.#addToColumn(0);
        } else if (x < 200) {
            this.#addToColumn(1);
        } else if (x < 300) {
            this.#addToColumn(2);
        } else if (x < 400) {
            this.#addToColumn(3);
        } else if (x < 500) {
            this.#addToColumn(4);
        } else if (x < 600) {
            this.#addToColumn(5);
        } else if (x < 700) {
            this.#addToColumn(6);
        }
    }

    get isDraw() {
        //Tall unfilled circles
        const unfilled = this.#gameBoard.reduce((total, curr) =>
            total + curr.filter(c => c == "").length
        , 0);

        return unfilled == 0;  //Returns true if no unfilled circles
    }

    checkWinner() {
        let state = null;

        //check rows
        for (let row in this.#gameBoard) {                          // loop rows
            state = {count: 0, color: ""};
            for (let col in this.#gameBoard[row]) {                 // loop coloumns
                if (this.#isWinner(state, row, col)) return true;
            }
        }
        //Check columns
        for (let col in this.#gameBoard[0]) {                     // loop columns
            state = {count: 0, color: ""};
            for (let row in this.#gameBoard) {                    // loop rows
                if (this.#isWinner(state, row, col)) return true;
            }
        }

        //Values for diagonal checks
        const firstRow = this.#gameBoard[0];
        const firstColumn = this.#gameBoard.map(r => r[0]);       //Get first element
        const lastColumn = this.#gameBoard.map(r => r.at(-1));    //Get last element
        let rowIndex = 0;
        let colIndex = 0;

        //Check left to right diagonal
        for (let i in firstRow) {
            state = {count: 0, color: ""};
            rowIndex = 0;
            colIndex = parseInt(i);
            if (this.#isLeftToRightWinner(state, rowIndex, colIndex, firstRow)) return true;
        }
        for (let i in firstColumn) {
            if (i == 0) continue;  //Skip first element
            state = {count: 0, color: ""};
            rowIndex = parseInt(i);
            colIndex = 0;
            if (this.#isLeftToRightWinner(state, rowIndex, colIndex, firstRow)) return true;
        }
        
        //Check right to left diagonals
        for (let i = firstRow.length - 1; i >= 0; i--) {
            state = {count: 0, color: ""};
            rowIndex = 0;
            colIndex = i;
            if (this.#isRightToLeftWinner(state, rowIndex, colIndex)) return true;
        }
        for (let i in lastColumn) {
            if (i == 0) continue;   // Skip first element
            state = {count: 0, color: ""};
            rowIndex = parseInt(i);
            colIndex = firstRow.length - 1;
            if (this.#isRightToLeftWinner(state, rowIndex, colIndex)) return true;
        }

        // no winner
        return false;
    }
}