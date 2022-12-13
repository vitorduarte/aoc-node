import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('\n');

  solvePart1(input);
  solvePart2(input);
};

const solvePart1 = (input: string[]) => {
  let result = input.length * 2 + (input[0].length - 2) * 2;

  for (let i = 1; i < input.length - 1; i++) {
    const line = input[i].split('');
    for (let j = 1; j < line.length - 1; j++) {
      const center = parseInt(line[j]);

      const left = line.slice(0, j);
      if (left.every((v) => parseInt(v) < center)) {
        result++;
        continue;
      }

      const right = line.slice(j + 1, line.length);
      if (right.every((v) => parseInt(v) < center)) {
        result++;
        continue;
      }

      const up = input.slice(0, i).map((v) => v.split('')[j]);
      if (up.every((v) => parseInt(v) < center)) {
        result++;
        continue;
      }

      const down = input.slice(i + 1, input.length).map((v) => v.split('')[j]);
      if (down.every((v) => parseInt(v) < center)) {
        result++;
        continue;
      }
    }
  }

  console.log('Part 1 Solution :>> ', result);
};

const getScenicScore = (center: number, arr: string[]): number => {
  let i = 0;
  while (i < arr.length) {
    if (parseInt(arr[i]) < center) {
      i++;
    }

    if (parseInt(arr[i]) >= center) {
      i++;
      break;
    }
  }
  return i;
};

const solvePart2 = (input: string[]) => {
  let highestScenic = 0;

  for (let i = 1; i < input.length - 1; i++) {
    const line = input[i].split('');
    for (let j = 1; j < line.length - 1; j++) {
      const center = parseInt(line[j]);
      const left = line.slice(0, j).reverse();
      const right = line.slice(j + 1, line.length);
      const up = input
        .slice(0, i)
        .map((v) => v.split('')[j])
        .reverse();
      const down = input.slice(i + 1, input.length).map((v) => v.split('')[j]);

      const score =
        getScenicScore(center, left) *
        getScenicScore(center, right) *
        getScenicScore(center, up) *
        getScenicScore(center, down);

      if (score > highestScenic) {
        highestScenic = score;
      }
    }
  }
  console.log('Part 2 Solution :>> ', highestScenic);
};

main();
