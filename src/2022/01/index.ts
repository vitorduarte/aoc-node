import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n\n');
  solvePart1(input);
  solvePart2(input);
};

const sumCalories = (input: string[]) =>
  input.map((cal) => cal.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0)).sort((a, b) => b - a);

const solvePart1 = (input: string[]) => {
  const [max] = sumCalories(input);
  console.log('Part 1 Solution :>> ', max);
};

const solvePart2 = (input: string[]) => {
  const top3Sum = sumCalories(input)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
  console.log('Part 2 Solution :>> ', top3Sum);
};

main();
