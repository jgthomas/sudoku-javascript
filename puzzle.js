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
    let backtracking = false;
    let gridPosition = row * this.rows + col;

    while (gridPosition < this.totalSquares) {
      let currentSquare = this.puzzle[row][col];

      if (currentSquare.presentFromStart) {
        if (backtracking) {
          col = this.previousColumn(col);
          row = this.rowBack(col, row);
        }

        col = this.nextColumn(col);
        row = this.rowForward(col, row);
      }

      let number = this.numberForPosition(row, col);
      backtracking = this.noValidNumberFound(number);

      this.puzzle[row][col].number = number;

      if (backtracking) {
        col = this.previousColumn(col);
        row = this.rowBack(col, row);
      } else {
        col = this.nextColumn(col);
        row = this.rowForward(col, row);
      }

      if (this.backtrackedPastStartOfPuzzle(row, col)) {
        throw new Error("Puzzle cannot be solved!");
      }

      gridPosition = row * this.rows + col;
    }
  }

  noValidNumberFound(number) {
    return number === 0;
  }

  nextColumn(col) {
    return col === this.cols - 1 ? 0 : col + 1;
  }

  previousColumn(col) {
    return col === 0 ? this.cols - 1 : col - 1;
  }

  /**
   * if moved to first col increment row, else same row
   */
  rowForward(col, row) {
    return col === 0 ? row + 1 : row;
  }

  /**
   * if moved back to last col decrement row, else same row
   */
  rowBack(col, row) {
    return col === this.cols - 1 ? row - 1 : row;
  }

  backtrackedPastStartOfPuzzle(row, col) {
    return col < 0 && row === 0;
  }

  numberForPosition(row, col) {
    const currentNumber = this.puzzle[row][col].number;
    const firstTry = currentNumber === 0 ? 1 : currentNumber;

    for (let num = firstTry; num <= this.maxNumber; num++) {
      if (this.numberAllowed(row, col, num)) {
        return num;
      }
    }

    return 0;
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
    for (const square of this.puzzle[row]) {
      if (square.number === num) {
        return false;
      }
    }

    return true;
  }

  notInCol(col, num) {
    for (const row of this.puzzle) {
      if (row[col].number === num) {
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
        if (this.puzzle[row][col].number === num) {
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

  toIntArray() {
    return this.puzzle.map((row) => row.map((square) => square.number));
  }
}

module.exports = Puzzle;
