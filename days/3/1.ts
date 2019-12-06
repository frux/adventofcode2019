/**
 * Find the closest intersections of wires
 * @see https://adventofcode.com/2019/day/3#part1
 */

type TPathDirection = string;
type TPath = TPathDirection[];
type TCoordinate = [number, number];

const CENTRAL_PORT_COORD: TCoordinate = [0, 0];

export default function main(input: string): number {
    let [path1, path2] = parseInput(input);

    return getClosestIntersectionDistance(path1, path2, CENTRAL_PORT_COORD);
}

function getClosestIntersectionDistance(path1: TPath, path2: TPath, from: TCoordinate): number {
    // Don't include a start coordinate because it's not considered as an intersection
    let path1Coords = [];
    let pointer1 = from;

    // Fill an array by path1 coordinates
    for (let path1Dir of path1) {

        // Get a direction and a distance to go
        let [directionCode, length] = parsePathDirection(path1Dir);

        // Push a coordinate to the array and move a pointer further
        for (let i = 0; i < length; i++) {
            pointer1 = getNextCoord(pointer1, directionCode);

            path1Coords.push(pointer1);
        }
    }

    let closestDistance = Infinity;
    let pointer2 = from;

    // Move by every coordinate of path2 and check if it's an intersection with path1
    for (let path2Dir of path2) {

        // Get a direction and a distance to go
        let [directionCode, length] = parsePathDirection(path2Dir);

        // Move a pointer to the next coordinate
        for (let i = 0; i < length; i++) {
            pointer2 = getNextCoord(pointer2, directionCode);

            // Compare this coordinate with every coordinate of path1
            for (let path1Coord of path1Coords) {

                // Is it an intersection?
                if (isIntersection(path1Coord, pointer2)) {
                    let distance = getManhattanDistance(from, pointer2);

                    // Remember this distance if it's lesser then a previously remembered
                    if (distance < closestDistance) {
                        closestDistance = distance;
                    }
                }
            }
        }
    }

    return closestDistance;
}

enum DIRECTION_CODE {
    UP = 'U',
    RIGHT = 'R',
    DOWN = 'D',
    LEFT = 'L'
};

const MOVE_OFFSET: Record<DIRECTION_CODE, TCoordinate> = {
    [DIRECTION_CODE.UP]: [0, 1],
    [DIRECTION_CODE.RIGHT]: [1, 0],
    [DIRECTION_CODE.DOWN]: [0, -1],
    [DIRECTION_CODE.LEFT]: [-1, 0]
};

function getNextCoord(from: TCoordinate, directionCode: DIRECTION_CODE): TCoordinate {
    let [x, y] = from;
    let [offsetX, offsetY] = MOVE_OFFSET[directionCode];

    return [x + offsetX, y + offsetY];
}

function parsePathDirection(direction: TPathDirection): [DIRECTION_CODE, number] {
    let directionCode = direction[0] as DIRECTION_CODE;
    let length = Number(direction.slice(1));

    return [directionCode, length];
}

function isIntersection(coord1: TCoordinate, coord2: TCoordinate): boolean {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function getManhattanDistance(coord1: TCoordinate, coord2: TCoordinate) {
    return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
}

function parseInput(input: string): [TPath, TPath] {
    return input
        .split('\n')
        .map(line => line.split(',')) as [TPath, TPath]
}
