class Puzzle {
  constructor(size, puzzle) {
    this.rows = size;
    this.cols = size;
    this.boxesAcross = Math.sqrt(size);
    this.boxesDown = Math.sqrt(size);
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

      currentSquare = this.puzzle[row][col];
      currentSquare.number = this.numberForPosition(currentSquare);
      backtracking = this.noValidNumberFound(currentSquare.number);

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

  numberForPosition(currentSquare) {
    const currentNumber = currentSquare.number === 0 ? 1 : currentSquare.number;

    for (let num = currentNumber; num <= this.maxNumber; num++) {
      if (this.numberAllowed(currentSquare, num)) {
        return num;
      }
    }

    return 0;
  }

  numberAllowed(currentSquare, num) {
    if (
      this.notInRow(currentSquare, num) &&
      this.notInCol(currentSquare, num) &&
      this.notInBox(currentSquare, num)
    ) {
      return true;
    }

    return false;
  }

  notInRow(currentSquare, num) {
    for (const square of this.puzzle[currentSquare.row]) {
      if (square.number === num) {
        return false;
      }
    }

    return true;
  }

  notInCol(currentSquare, num) {
    for (const row of this.puzzle) {
      if (row[currentSquare.col].number === num) {
        return false;
      }
    }

    return true;
  }

  notInBox(currentSquare, num) {
    for (
      let row = currentSquare.boxMinRow;
      row < currentSquare.boxMaxRow;
      row++
    ) {
      for (
        let col = currentSquare.boxMinCol;
        col < currentSquare.boxMaxCol;
        col++
      ) {
        if (this.puzzle[row][col].number === num) {
          return false;
        }
      }
    }

    return true;
  }

  toIntArray() {
    return this.puzzle.map((row) => row.map((square) => square.number));
  }
}

class Square {
  constructor(number, row, col, boxDimension) {
    this.number = number;
    this.presentFromStart = number !== 0;
    this.row = row;
    this.col = col;
    this.boxDimension = boxDimension;
    this.boxCount = boxDimension;
    this.size = this.boxDimension * this.boxCount;
    this.boxMinRow = this.minRow();
    this.boxMinCol = this.minCol();
    this.boxMaxRow = this.maxRow();
    this.boxMaxCol = this.maxCol();
  }

  minRow() {
    let minRow = 0;

    if (this.row >= 2 * this.boxDimension) {
      minRow = 2 * this.boxDimension;
    } else if (this.row >= this.boxDimension) {
      minRow = this.boxDimension;
    }

    return minRow;
  }

  minCol() {
    let minCol = 0;

    if (this.col >= 2 * this.boxDimension) {
      minCol = 2 * this.boxDimension;
    } else if (this.col >= this.boxDimension) {
      minCol = this.boxDimension;
    }

    return minCol;
  }

  maxRow() {
    return this.boxMinRow + this.size / this.boxCount;
  }

  maxCol() {
    return this.boxMinCol + this.size / this.boxCount;
  }
}

module.exports = Puzzle;
