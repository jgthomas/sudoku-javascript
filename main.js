const Puzzle = require("./puzzle");
const PuzzlePrinter = require("./puzzle-printer");

const samplePuzzleSize = 9;

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
];

const puzzle = new Puzzle(samplePuzzleSize, samplePuzzle);
puzzle.solve();
const puzzlePrinter = new PuzzlePrinter(puzzle);
puzzlePrinter.print();
