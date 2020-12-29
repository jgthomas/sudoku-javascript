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
    const puzzleGrid = Array.from(Array(this.rows), () => new Array(this.cols));

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
}

module.exports = Puzzle;
