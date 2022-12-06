import { readFileSync } from 'fs';
import path from 'path';

const main = () => {
  // [V]         [T]         [J]
  // [Q]         [M] [P]     [Q]     [J]
  // [W] [B]     [N] [Q]     [C]     [T]
  // [M] [C]     [F] [N]     [G] [W] [G]
  // [B] [W] [J] [H] [L]     [R] [B] [C]
  // [N] [R] [R] [W] [W] [W] [D] [N] [F]
  // [Z] [Z] [Q] [S] [F] [P] [B] [Q] [L]
  // [C] [H] [F] [Z] [G] [L] [V] [Z] [H]
  //  1   2   3   4   5   6   7   8   9
  const stacks = [
    ['C', 'Z', 'N', 'B', 'M', 'W', 'Q', 'V'],
    ['H', 'Z', 'R', 'W', 'C', 'B'],
    ['F', 'Q', 'R', 'J'],
    ['Z', 'S', 'W', 'H', 'F', 'N', 'M', 'T'],
    ['G', 'F', 'W', 'L', 'N', 'Q', 'P'],
    ['L', 'P', 'W'],
    ['V', 'B', 'D', 'R', 'G', 'C', 'Q', 'J'],
    ['Z', 'Q', 'N', 'B', 'W'],
    ['H', 'L', 'F', 'C', 'G', 'T', 'J']
  ];
  const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim().split('\n');
  solvePart1(stacks, input); // QNHWJVJZW
  solvePart2(stacks, input); // BPCZJLFJW
};

const solvePart1 = (stacks: string[][], input: string[]) => {
  const newStacks = input.reduce((acc, curr) => {
    const [, quant, col, dest] = curr.match(/move (\d*) from (\d*) to (\d*)/)!.map((v) => parseInt(v));
    acc[dest - 1].push(...acc[col - 1].slice(-1 * quant).reverse());
    acc[col - 1] = acc[col - 1].slice(0, -1 * quant);
    return acc;
  }, JSON.parse(JSON.stringify(stacks)) as string[][]);

  const result = newStacks.flatMap((s) => s.slice(-1)).join('');
  console.log('Part 1 Solution :>> ', result);
};

const solvePart2 = (stacks: string[][], input: string[]) => {
  const newStacks = input.reduce((acc, curr) => {
    const [, quant, col, dest] = curr.match(/move (\d*) from (\d*) to (\d*)/)!.map((v) => parseInt(v));
    acc[dest - 1].push(...acc[col - 1].slice(-1 * quant));
    acc[col - 1] = acc[col - 1].slice(0, -1 * quant);
    return acc;
  }, JSON.parse(JSON.stringify(stacks)) as string[][]);

  const result = newStacks.flatMap((s) => s.slice(-1)).join('');
  console.log('Part 2 Solution :>> ', result);
};

main();
