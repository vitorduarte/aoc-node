import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('');
  solvePart1(input);
  solvePart2(input);
};

const findDistinctCharsPos = (input: string[], quantity: number) => {
  for (let i = 0; i < input.length; i++) {
    const unique = new Set(input.slice(i, i + quantity));
    if (unique.size === quantity) {
      return i + quantity;
    }
  }
};

const solvePart1 = (input: string[]) => {
  console.log('Part 1 Solution :>> ', findDistinctCharsPos(input, 4));
};

const solvePart2 = (input: string[]) => {
  const result = 0;
  console.log('Part 2 Solution :>> ', findDistinctCharsPos(input, 14));
};

main();
