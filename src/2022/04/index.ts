import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('\n');
  solvePart1(input);
  solvePart2(input);
};

const getBoundaries = (section: string): { lower: number; upper: number } => {
  const [lower, upper] = section.split('-').map((b) => parseInt(b));
  return { lower, upper };
};

const solvePart1 = (input: string[]) => {
  const count = input.reduce((acc, curr) => {
    const [firstBound, secondBound] = curr.split(',').map((s) => getBoundaries(s));
    if (firstBound.lower >= secondBound.lower && firstBound.upper <= secondBound.upper) {
      return acc + 1;
    }
    if (secondBound.lower >= firstBound.lower && secondBound.upper <= firstBound.upper) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log('Part 1 Solution :>> ', count);
};

const solvePart2 = (input: string[]) => {
  const count = input.reduce((acc, curr) => {
    const [firstBound, secondBound] = curr.split(',').map((s) => getBoundaries(s));
    if (
      (firstBound.lower >= secondBound.lower && firstBound.lower <= secondBound.upper) ||
      (firstBound.upper >= secondBound.lower && firstBound.upper <= secondBound.upper)
    ) {
      return acc + 1;
    }
    if (
      (secondBound.lower >= firstBound.lower && secondBound.lower <= firstBound.upper) ||
      (secondBound.upper >= firstBound.lower && secondBound.upper <= firstBound.upper)
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log('Part 2 Solution :>> ', count);
};

main();
