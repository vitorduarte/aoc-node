import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('\n');

  solvePart1(input);
  solvePart2(input);
};

type Position = {
  row: number;
  col: number;
};

const getPositionKey = (pos: Position): string => `${pos.row},${pos.col}`;

const moveHead = (headPos: Position, direction: string) => {
  const movMap = new Map<string, Position>([
    ['L', { row: -1, col: 0 }],
    ['R', { row: 1, col: 0 }],
    ['U', { row: 0, col: 1 }],
    ['D', { row: 0, col: -1 }]
  ]);

  const mov = movMap.get(direction);
  headPos.col += mov!.col;
  headPos.row += mov!.row;
};

const moveTailIfNeeded = (headPos: Position, tailPos: Position) => {
  const rowDiff = headPos.row - tailPos.row;
  const colDiff = headPos.col - tailPos.col;
  const isSameRow = headPos.row === tailPos.row;
  const isSameCol = headPos.col === tailPos.col;

  if (isSameRow && isSameCol) {
    return;
  }

  if (isSameRow && !isSameCol && Math.abs(colDiff) > 1) {
    tailPos.col += Math.sign(colDiff);
    return;
  }

  if (!isSameRow && isSameCol && Math.abs(rowDiff) > 1) {
    tailPos.row += Math.sign(rowDiff);
    return;
  }

  if (!isSameRow && !isSameCol && (Math.abs(rowDiff) > 1 || Math.abs(colDiff) > 1)) {
    tailPos.row += Math.sign(rowDiff);
    tailPos.col += Math.sign(colDiff);
  }

  return;
};

const solvePart1 = (input: string[]) => {
  let headPos: Position = {
    row: 0,
    col: 0
  };
  let tailPos: Position = {
    row: 0,
    col: 0
  };
  const tailPositions = new Map<string, boolean>();

  const result = input.reduce((acc, curr) => {
    const [dir, steps] = curr.split(' ');

    for (let i = 0; i < parseInt(steps); i++) {
      moveHead(headPos, dir);
      moveTailIfNeeded(headPos, tailPos);
      if (!tailPositions.has(getPositionKey(tailPos))) {
        tailPositions.set(getPositionKey(tailPos), true);
        acc++;
      }
    }

    return acc;
  }, 0);
  console.log('Part 1 Solution :>> ', result);
};

const solvePart2 = (input: string[]) => {
  const rope: Position[] = [...Array(10).keys()].map((_) => ({ row: 0, col: 0 }));
  const tailPositions = new Map<string, boolean>();

  const result = input.reduce((acc, curr) => {
    const [dir, steps] = curr.split(' ');

    for (let i = 0; i < parseInt(steps); i++) {
      rope.forEach((node, nodeIdx, arr) => {
        if (nodeIdx === 0) {
          moveHead(node, dir);
          return;
        }

        moveTailIfNeeded(arr[nodeIdx - 1], node);

        if (nodeIdx === 9) {
          if (!tailPositions.has(getPositionKey(node))) {
            tailPositions.set(getPositionKey(node), true);
            acc++;
          }
        }
      });
    }

    return acc;
  }, 0);
  console.log('Part 2 Solution :>> ', result);
};

main();
