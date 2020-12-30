const { test, expect, beforeAll } = require("@jest/globals");
const Puzzle = require("./puzzle");

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

const solvedPuzzle = [
  [1, 5, 6, 2, 4, 7, 3, 8, 9],
  [4, 3, 7, 5, 8, 9, 6, 1, 2],
  [2, 8, 9, 1, 3, 6, 7, 4, 5],
  [3, 1, 2, 4, 5, 8, 9, 6, 7],
  [5, 6, 4, 7, 9, 1, 2, 3, 8],
  [7, 9, 8, 3, 6, 2, 1, 5, 4],
  [6, 2, 1, 8, 7, 4, 5, 9, 3],
  [8, 7, 3, 9, 1, 5, 4, 2, 6],
  [9, 4, 5, 6, 2, 3, 8, 7, 1],
];

test("Solver works for basic valid puzzle", () => {
  const puzzle = new Puzzle(samplePuzzleSize, samplePuzzle);
  puzzle.solve();
  const solution = puzzle.toIntArray();
  expect(solution).toEqual(solvedPuzzle);
});
