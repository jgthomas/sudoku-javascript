const { test, expect } = require("@jest/globals");
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

test("Backtrack position", () => {
  const puzzle = new Puzzle(samplePuzzleSize, samplePuzzle);
  const newPostion = puzzle.backtrackPosition(0, 1);
  expect(newPostion).toEqual([0, 0]);
});
