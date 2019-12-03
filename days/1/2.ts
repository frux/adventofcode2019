/**
 * Calculate fuel required for all modules of spacecraft,
 * including additional fuel for fuel
 * @see https://adventofcode.com/2019/day/1#part2
 */

export default function main(input: string): number {
    let data = parseInput(input);
    let fuelTotal = 0;

    for (let moduleMass of data) {
        fuelTotal += getTotalRequiredFuel(moduleMass);
    }

    return fuelTotal;
};

function getTotalRequiredFuel(mass: number): number {
    let fuel = getFuel(mass);

    if (fuel <= 0) {
        return 0;
    }

    return fuel + getTotalRequiredFuel(fuel);
}

function getFuel(mass: number): number {
    return Math.floor(mass / 3) - 2;
}

function parseInput(input: string): number[] {
    return input
        .split('\n')
        .map(Number);
}
