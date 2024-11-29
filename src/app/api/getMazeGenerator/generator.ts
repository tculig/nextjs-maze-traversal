import seedrandom from 'seedrandom';

type MapCell = string;

export function generateMap(seed: string, characters: string, width: number, height: number): MapCell[][] {
    // Initialize a blank map
    const rng = seedrandom(seed);

    const map: MapCell[][] = Array.from({ length: height }, () => Array(width).fill(' '));
    // Random utility
    const randomInt = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;

    // Place start (@) and end (x)
    const startX = randomInt(0, width - 1);
    const startY = randomInt(0, height - 1);
    map[startY][startX] = '@';

    let currentX = startX;
    let currentY = startY;

    const directions = [
        { dx: 0, dy: -1, symbol: '|' }, // Up
        { dx: 0, dy: 1, symbol: '|' }, // Down
        { dx: -1, dy: 0, symbol: '-' }, // Left
        { dx: 1, dy: 0, symbol: '-' }, // Right
    ];

    // Function to place a letter and path on the map
    const placeCharacter = (char: string) => {
        while (true) {
            const validDirs = directions.filter(({ dx, dy }) => {
                const nx = currentX + dx;
                const ny = currentY + dy;
                return nx >= 0 && ny >= 0 && nx < width && ny < height && map[ny][nx] === ' ';
            });

            if (validDirs.length === 0) {
                throw new Error('Failed to generate map; no available paths.');
            }

            // Pick a random valid direction
            const { dx, dy, symbol } = validDirs[randomInt(0, validDirs.length - 1)];
            const pathX = currentX + dx;
            const pathY = currentY + dy;

            // Mark the path
            map[pathY][pathX] = symbol;

            // Place the character
            const charX = pathX + dx;
            const charY = pathY + dy;

            if (charX >= 0 && charY >= 0 && charX < width && charY < height && map[charY][charX] === ' ') {
                map[charY][charX] = char;
                currentX = charX;
                currentY = charY;
                break;
            }
        }
    };

    // Place all characters
    for (const char of characters) {
        placeCharacter(char);
    }

    // Place the ending (x)
    while (true) {
        const validDirs = directions.filter(({ dx, dy }) => {
            const nx = currentX + dx;
            const ny = currentY + dy;
            return nx >= 0 && ny >= 0 && nx < width && ny < height && map[ny][nx] === ' ';
        });

        if (validDirs.length === 0) {
            throw new Error("Failed to place ending 'x'; no available paths.");
        }

        const { dx, dy, symbol } = validDirs[randomInt(0, validDirs.length - 1)];
        const pathX = currentX + dx;
        const pathY = currentY + dy;

        map[pathY][pathX] = symbol;

        const endX = pathX + dx;
        const endY = pathY + dy;

        if (endX >= 0 && endY >= 0 && endX < width && endY < height && map[endY][endX] === ' ') {
            map[endY][endX] = 'x';
            break;
        }
    }

    return map;
}
