/**
 * Intcode computer program for gravity assist
 * @see https://adventofcode.com/2019/day/2#part1
 */

enum OPCODE {
    ADD = 1,
    MULTIPLY = 2,
    HALT = 99
};

type TProgram = number[];
type TOpcodePosition = number | null;

export default function main(input: string): number {
    let program = parseInput(input);

    restoreAlarmState(program);

    let opcodePos: TOpcodePosition = 0;

    while (opcodePos !== null) {
        opcodePos = execOpcodeAt(opcodePos, program);
    }

    return program[0];
}

/**
 * Restores program to the "1202 program alarm" state it had
 * just before the last computer caught fire
 */
function restoreAlarmState(program: TProgram): void {
    program[1] = 12;
    program[2] = 2;
}

/**
 * Executes opcode at specified position and returns position of next opcode position
 */
function execOpcodeAt(opcodePos: TOpcodePosition, program: TProgram): TOpcodePosition {
    let opcode = program[opcodePos];

    // Immediately exit on HALT opcode
    if (opcode === OPCODE.HALT) {
        return null;
    }

    let firstArgPos = program[opcodePos + 1];
    let secondArgPos = program[opcodePos + 2];
    let resultPos = program[opcodePos + 3];
    let nextOpcodePos = opcodePos + 4;
    let firstArg = program[firstArgPos];
    let secondArg = program[secondArgPos];
    let result;

    switch (opcode) {
        case OPCODE.ADD: {
            result = firstArg + secondArg;
            break;
        }

        case OPCODE.MULTIPLY: {
            result = firstArg * secondArg;
            break;
        }
    }

    program[resultPos] = result;

    return nextOpcodePos;
}

function parseInput(input: string): TProgram {
    return input
        .split(',')
        .map(Number)
}
