import { NextRequest, NextResponse } from 'next/server';
// import { generateMap } from './generator';
const maze1 = `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
`;
export type MazeResponse = {
    newMazes: string[];
};
export async function GET(req: NextRequest): Promise<NextResponse<MazeResponse | { error: string }>> {
    const url = new URL(req.url);
    const seed = url.searchParams.get('seed');
    const mazesPerRequest = url.searchParams.get('mazesPerRequest');

    if (!seed) {
        return NextResponse.json({ error: 'Seed and clientId are required' }, { status: 400 });
    }

    // Initialize PRNG with the seed
    // const rng = seedrandom(seed);

    // Generate a new random number based on the seed and track it
    // const newMaze = generateMap(seed, 'GOONIES', 10, 10);

    return NextResponse.json({
        newMazes: [...Array(mazesPerRequest)].map(() => maze1),
    });
}
