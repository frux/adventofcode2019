import assert from 'assert';
import path from 'path';

import { readInputFromFile } from './helpers/input';

try {
    (async () => {
        let dayNumber = Number(process.argv[2]);
        let taskNumber = Number(process.argv[3]);

        assert(isValidDayNumber(dayNumber), 'Wrong day number (1-31)');
        assert(isValidTaskNumber(taskNumber), 'Wrong task (either 1 or 2)');

        let [solveTask, input] = await Promise.all([
            getSolution(dayNumber, taskNumber),
            getInput(dayNumber)
        ]);
        let answer = await solveTask(input);

        console.log(answer);
    })();
} catch (err) {
    console.error(err);
    process.exit(1);
}

async function getInput(dayNumber: number): Promise<string> {
    let inputPath = path.resolve(__dirname, 'days', String(dayNumber), 'input');

    return readInputFromFile(inputPath);
}

type TTaskSolution = (taskPath: string) => any;

async function getSolution(dayNumber: number, taskNumber: number): Promise<TTaskSolution> {
    let solutionPath = `./days/${dayNumber}/${taskNumber}`;

    return (await import(solutionPath)).default as TTaskSolution;
}

function isValidDayNumber(dayNumber: number): boolean {
    return isFinite(dayNumber) && dayNumber > 0 && dayNumber <= 31;
}

function isValidTaskNumber(taskNumber: number): boolean {
    return taskNumber === 1 || taskNumber === 2;
}
