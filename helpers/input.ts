import { promises as fs } from 'fs';

export async function readInputFromFile(inputFilePath: string): Promise<string> {
    return (await fs.readFile(inputFilePath)).toString();
}
