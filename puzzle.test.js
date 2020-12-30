const { test, expect, beforeAll } = require("@jest/globals");
const Puzzle = require("./puzzle");
const { samplePuzzleSize, samplePuzzle, solvedPuzzle } = require("./test-data");

test("Solver works for basic valid puzzle", () => {
  const puzzle = new Puzzle(samplePuzzleSize, samplePuzzle);
  puzzle.solve();
  const solution = puzzle.toIntArray();
  expect(solution).toEqual(solvedPuzzle);
});

test("Solver selects first potential value for the first empty position", () => {
  const puzzle = new Puzzle(samplePuzzleSize, samplePuzzle);
  const square = puzzle.puzzle[0][1];
  const number = puzzle.numberForPosition(square);
  expect(number).toBe(5);
});
