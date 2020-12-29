class Square {
  constructor(number) {
    this.number = number;
    this.presentFromStart = number === 0;
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
      puzzleRow.push(new Square(number));
    }

    return puzzleRow;
  }

  solve() {
    let row = 0;
    let col = 0;
    let movingForward = true;

    while (row * col < this.totalSquares) {
      let currentSquare = this.puzzle[row][col];

      if (currentSquare.presentFromStart) {
        if (movingForward) {
          col++;
        } else {
          col--;
        }
      }
    }
  }

  fillSquare(row, col) {
    const currentNumber = this.puzzle[row][col].number;
    let firstTry = currentNumber;

    if (currentNumber === 0) {
      firstTry = 1;
    }

    for (let num = firstTry; num <= this.maxNumber; num++) {
      if (this.numberAllowed(row, col, num)) {
        puzzle[row][col].number = num;
        return true;
      }
    }

    this.puzzle[row][col].number = 0;
    return false;
  }

  numberAllowed(row, col, num) {
    if (
      this.notInRow(row, num) &&
      this.notInCol(col, num) &&
      this.notInBox(row, col, num)
    ) {
      return true;
    }

    return false;
  }

  notInRow(row, num) {
    return !this.puzzle[row].includes(num);
  }

  notInCol(col, num) {
    for (row in this.puzzle) {
      if (row[col] === num) {
        return false;
      }
    }

    return true;
  }

  notInBox(row, col, num) {
    return false;
  }
}

module.exports = Puzzle;
