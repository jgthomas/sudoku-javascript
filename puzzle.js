class Square {
  constructor(number) {
    this.number = number;
    this.presentFromStart = number !== 0;
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
    let currentSquareNum = row * this.rows + col;

    while (currentSquareNum < this.totalSquares) {
      let currentSquare = this.puzzle[row][col];

      if (currentSquare.presentFromStart) {
        if (movingForward) {
          col++;
        } else {
          col--;
        }
      } else if (this.fillSquare(row, col)) {
        col++;
        movingForward = true;
      } else {
        col--;
        movingForward = false;
      }

      if (col >= this.cols) {
        row++;
        col = 0;
      } else if (col < 0) {
        if (row === 0) {
          return;
        } else {
          row--;
          col = this.cols - 1;
        }
      }

      currentSquareNum = row * this.rows + col;
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
        this.puzzle[row][col].number = num;
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
    for (const row in this.puzzle) {
      if (row[col] === num) {
        return false;
      }
    }

    return true;
  }

  notInBox(rowCurrent, colCurrent, num) {
    const rowMin = this.minRow(rowCurrent);
    const rowMax = this.maxRow(rowMin);
    const colMin = this.minCol(colCurrent);
    const colMax = this.maxCol(colMin);

    for (let row = rowMin; row < rowMax; row++) {
      for (let col = colMin; col < colMax; col++) {
        if (this.puzzle[row][col] === num) {
          return false;
        }
      }
    }

    return true;
  }

  minRow(row) {
    let minRow = 0;

    if (row >= 2 * this.rowsPerBox) {
      minRow = 2 * this.rowsPerBox;
    } else if (row >= this.rowsPerBox) {
      minRow = this.rowsPerBox;
    }

    return minRow;
  }

  minCol(col) {
    let minCol = 0;

    if (col >= 2 * this.colsPerBox) {
      minCol = 2 * this.colPerBox;
    } else if (col >= this.colsPerBox) {
      minCol = this.colsPerBox;
    }

    return minCol;
  }

  maxRow(minRow) {
    return minRow + this.rows / this.boxesDown;
  }

  maxCol(minCol) {
    return minCol + this.cols / this.boxesAcross;
  }
}

module.exports = Puzzle;
