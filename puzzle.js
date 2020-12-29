
const samplePuzzle = [
    [1, 0, 0, 2, 0, 0, 3, 0, 0],
    [4, 0, 0, 5, 0, 0, 6, 0, 0],
    [2, 0, 0, 1, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

class Square {
    constructor(number, presentFromStart) {
        this.number = number;
        this.presentFromStart = presentFromStart;
    }
}

class Puzzle {
    constructor(size, puzzle) {
        this.rows = size;
        this.cols = size;
        this.boxesAcross = Math.sqrt(size);
        this.boxesDown = Math.sqrt(size);
        this.rowsPerBox = Math.sqrt(size);
        this.colsPerBox = Math.sqrt(size);
        this.totalSquares = Math.pow(size, 2);
        this.maxNumber = size;
        this.puzzle = this.makePuzzle(puzzle);
    }

    makePuzzle(puzzle) {
        const puzzleGrid = Array.from(Array(this.rows), () => new Array(this.cols))

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                puzzleGrid[row][col] = this.makeSquare(puzzle[row][col]);
            }
        }

        return puzzleGrid;
    }

    makeSquare(number) {
        const presentFromStart = number === 0;
        return new Square(number, presentFromStart);
    }

    printPuzzle() {
        console.log(this.puzzleToString());
    }

    puzzleToString() {
        let puzzleString = this.dividerString();

        for (let row = 0; row < this.rows; row++) {
            puzzleString += "|";

            for (let col = 0; col < this.cols; col++) {
                const number = this.puzzle[row][col].number;

                if (number == 0) {
                    puzzleString += " - ";
                } else {
                    puzzleString += ` ${number} `;
                }

                if (this.reachedLastCol(col)) {
                    puzzleString += "|";
                }
            }

            if (this.reachedLastRow(row)) {
                puzzleString += this.dividerString();
            } else {
                puzzleString += "\n";
            }
        }

        puzzleString += "\n";

        return puzzleString;
    }

    dividerString() {
        let divider = "\n";

        for (let row = 0; row < this.rows; row++) {
            divider += "---";
        }

        divider += "----\n";

        return divider;
    }

    reachedLastCol(col) {
        return (col + 1) % this.colsPerBox === 0;
    }

    reachedLastRow(row) {
        return (row + 1) % this.rowsPerBox === 0;
    }
}

const puzzle = new Puzzle(9, samplePuzzle);
puzzle.printPuzzle();
