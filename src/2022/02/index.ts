import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n');
  solvePart1(input);
  solvePart2(input);
};

const solvePart1 = (input: string[]) => {
  /*
  A - Rock
  B - Paper
  C - Scissors

  X - Rock
  Y - Paper
  Z - Scissors
  */
  const pointsMap: { [op: string]: { [my: string]: number } } = {
    A: {
      X: 1 + 3,
      Y: 2 + 6,
      Z: 3 + 0
    },
    B: {
      X: 1 + 0,
      Y: 2 + 3,
      Z: 3 + 6
    },
    C: {
      X: 1 + 6,
      Y: 2 + 0,
      Z: 3 + 3
    }
  };

  const sum = input.reduce((acc, curr) => {
    const [op, my] = curr.split(' ');
    acc += pointsMap[op][my];
    return acc;
  }, 0);

  console.log('Part 1 Solution :>> ', sum);
};

const solvePart2 = (input: string[]) => {
  /*
  A - Rock
  B - Paper
  C - Scissors

  X - Lose
  Y - Draw
  Z - Win
  */
  const pointsMap: { [op: string]: { [my: string]: number } } = {
    A: {
      X: 3 + 0,
      Y: 1 + 3,
      Z: 2 + 6
    },
    B: {
      X: 1 + 0,
      Y: 2 + 3,
      Z: 3 + 6
    },
    C: {
      X: 2 + 0,
      Y: 3 + 3,
      Z: 1 + 6
    }
  };

  const sum = input.reduce((acc, curr) => {
    const [op, res] = curr.split(' ');
    acc += pointsMap[op][res];
    return acc;
  }, 0);
  console.log('Part 2 Solution :>> ', sum);
};

main();
