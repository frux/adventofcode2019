/**
 * Find correct initial values for gravity program
 * @see https://adventofcode.com/2019/day/2#part2
 */

enum OPCODE {
    ADD = 1,
    MULTIPLY = 2,
    HALT = 99
};

type TProgram = number[];
type TOpcodePosition = number | null;

const MIN_VALUE = 0;
const MAX_VALUE = 99;
const TARGET_OUTPUT = 19690720;

export default function main(input: string): number {
    let program = parseInput(input);

    for (let noun = MIN_VALUE; noun <= MAX_VALUE; noun++) {
        for (let verb = MIN_VALUE; verb <= MAX_VALUE; verb++) {
            if (execProgram(program, noun, verb) === TARGET_OUTPUT) {
                return 100 * noun + verb;
            }
        }
    }
}

/**
 * Executes program with specified initial values and returns program output.
 * It doesn't mutate program.
 */
function execProgram(program: TProgram, noun: number, verb: number) {
    let programCopy = [...program];
    let opcodePos: TOpcodePosition = 0;

    applyInitialValues(programCopy, noun, verb);

    while (opcodePos !== null) {
        opcodePos = execOpcodeAt(opcodePos, programCopy);
    }

    return programCopy[0];
}

function applyInitialValues(program: TProgram, noun: number, verb: number): void {
    program[1] = noun;
    program[2] = verb;
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
