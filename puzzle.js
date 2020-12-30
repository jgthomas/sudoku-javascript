class Square {
  constructor(number, row, col, boxDimension) {
    this.number = number;
    this.presentFromStart = number !== 0;
    this.row = row;
    this.col = col;
    this.boxDimension = boxDimension;
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
    this.boxDimension = Math.sqrt(size);
    this.totalSquares = Math.pow(size, 2);
    this.maxNumber = size;
    this.puzzle = this.makePuzzle(puzzle);
  }

  makePuzzle(puzzle) {
    const puzzleGrid = Array.from(this.rows);

    let rowNum = 0;

    for (const row of puzzle) {
      puzzleGrid.push(this.makePuzzleRow(row, rowNum));
      rowNum++;
    }

    return puzzleGrid;
  }

  makePuzzleRow(row, rowNum) {
    const puzzleRow = Array.from(this.cols);

    let colNum = 0;

    for (const number of row) {
      puzzleRow.push(new Square(number, rowNum, colNum, this.boxDimension));
      colNum++;
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
          [row, col] = this.backtrackPosition(row, col);
        }

        [row, col] = this.forwardPosition(row, col);
      }

      let number = this.numberForPosition(row, col);
      backtracking = this.noValidNumberFound(number);

      this.puzzle[row][col].number = number;

      if (backtracking) {
        [row, col] = this.backtrackPosition(row, col);
      } else {
        [row, col] = this.forwardPosition(row, col);
      }

      if (this.backtrackedPastStartOfPuzzle(row, col)) {
        throw new Error("Puzzle cannot be solved!");
      }

      gridPosition = row * this.rows + col;
    }
  }

  backtrackPosition(row, col) {
    const newCol = col === 0 ? this.cols - 1 : col - 1;
    const newRow = newCol === this.cols - 1 ? row - 1 : row;
    return [newRow, newCol];
  }

  forwardPosition(row, col) {
    const newCol = col === this.cols - 1 ? 0 : col + 1;
    const newRow = newCol === 0 ? row + 1 : row;
    return [newRow, newCol];
  }

  noValidNumberFound(number) {
    return number === 0;
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
