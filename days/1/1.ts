/**
 * Calculate fuel required for all modules of spacecraft
 * @see https://adventofcode.com/2019/day/1#part1
 */

export default function main(input: string): number {
    let data = parseInput(input);
    let fuelTotal = 0;

    for (let moduleMass of data) {
        fuelTotal += getFuel(moduleMass);
    }

    return fuelTotal;
};

function getFuel(mass: number): number {
    return Math.floor(mass / 3) - 2;
}

function parseInput(input: string): number[] {
    return input
        .split('\n')
        .map(Number);
}
