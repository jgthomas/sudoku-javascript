class PuzzlePrinter {
  constructor(puzzle) {
    this.puzzle = puzzle;
  }

  print() {
    console.log(this.puzzleToString());
  }

  puzzleToString() {
    let puzzleString = this.dividerString();

    for (let row = 0; row < this.puzzle.rows; row++) {
      puzzleString += "|";

      for (let col = 0; col < this.puzzle.cols; col++) {
        const number = this.puzzle.puzzle[row][col].number;

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
    return `\n${"---".repeat(this.puzzle.rows)}----\n`;
  }

  reachedLastCol(col) {
    return (col + 1) % this.puzzle.colsPerBox === 0;
  }

  reachedLastRow(row) {
    return (row + 1) % this.puzzle.rowsPerBox === 0;
  }
}

module.exports = PuzzlePrinter;
