/**
 * Count passwords matching criterias v2
 * @see https://adventofcode.com/2019/day/4#part2
 */

export default function main(input: string): number {
    let [from, to] = parseInput(input);
    let correctPasswordsCount = 0;

    for (let i = from; i <= to; i++) {
        if (!isSixDigit(i)) {
            continue;
        }

        if (!hasSameAdjacentDigits(i)) {
            continue;
        }

        if (hasDecreasing(i)) {
            continue;
        }

        correctPasswordsCount++;
    }

    return correctPasswordsCount;
}

function isSixDigit(num: number): boolean {
    return num >= 100000 && num <= 999999;
}

function hasSameAdjacentDigits(num: number): boolean {
    let str = String(num);

    for (let i = 0; i < str.length; i++) {
        let digit = Number(str[i]);
        let prevDigit = Number(str[i - 1]);
        let nextDigit = Number(str[i + 1]);
        let nextNextDigit = Number(str[i + 2]);

        if (prevDigit !== digit && digit === nextDigit && nextDigit !== nextNextDigit) {
            return true
        }
    }

    return false;
}

function hasDecreasing(num: number): boolean {
    let str = String(num);
    let prevDigit: number;

    for (let symb of str) {
        let digit = Number(symb);

        if (digit < prevDigit) {
            return true;
        }

        prevDigit = digit;
    }

    return false;
}

function parseInput(input: string): [number, number] {
    return input
        .split('-')
        .map(Number) as [number, number];
}
