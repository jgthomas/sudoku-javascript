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
    const puzzleGrid = Array.from(this.rows);

    for (const row of puzzle) {
      puzzleGrid.push(this.makePuzzleRow(row));
    }

    return puzzleGrid;
  }

  makePuzzleRow(row) {
    const puzzleRow = Array.from(this.cols);

    for (const number of row) {
      puzzleRow.push(this.makeSquare(number));
    }

    return puzzleRow;
  }

  makeSquare(number) {
    const presentFromStart = number === 0;
    return new Square(number, presentFromStart);
  }
}

module.exports = Puzzle;
