import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n');
  solvePart1(input);
  solvePart2(input);
};

const charToPriority = (char: string): number => {
  const asciiCode = char.charCodeAt(0);
  return asciiCode >= 65 && asciiCode <= 90 ? asciiCode - 38 : asciiCode - 96;
};

const solvePart1 = (input: string[]) => {
  const sum = input.reduce((acc, curr) => {
    const [first, second] = [
      curr.slice(0, curr.length / 2).split(''),
      curr.slice(curr.length / 2, curr.length).split('')
    ];

    const [commonItem] = first.filter((item) => second.includes(item));
    const priority = charToPriority(commonItem);
    return acc + priority;
  }, 0);

  console.log('Part 1 Solution :>> ', sum);
};

const chunk = (input: string[], size: number): string[][] =>
  input.reduce((acc, _, idx, arr) => {
    if (idx % size === 0) {
      acc.push(arr.slice(idx, idx + size));
    }
    return acc;
  }, [] as string[][]);

const solvePart2 = (input: string[]) => {
  const groups = chunk(input, 3);
  const sum = groups.reduce((acc, curr) => {
    const [first, second, third] = curr.map((s) => s.split(''));
    const [commonItem] = first.filter((item) => second.includes(item) && third.includes(item));
    const priority = charToPriority(commonItem);
    return acc + priority;
  }, 0);
  console.log('Part 2 Solution :>> ', sum);
};

main();
