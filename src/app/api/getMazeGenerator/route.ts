import { NextRequest, NextResponse } from 'next/server';
// import { generateMap } from './generator';
const maze1 = `
  @
  | +-N--+
  H |    |
  +---A--+
    |      x
    |      |
    +---D--+
`;
const maze2 = `
  @---F---+
          |
x +-I-+   R
K |   L   |
+-C   +---O
`;
const maze3 = `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
`;
const maze4 = `
 +-I-+
 |  +R-+
@B+ ++ D
 ++    x
`;
const maze5 = `
  @---S---+
          |
  x-Y-+   K
      |   |
      +---+
`;

export type MazeResponse = {
    newMazes: {
        word: string;
        maze: string;
    }[];
};

export async function GET(req: NextRequest): Promise<NextResponse<MazeResponse | { error: string }>> {
    const url = new URL(req.url);
    const seed = url.searchParams.get('seed');
    // const mazesPerRequest = url.searchParams.get('mazesPerRequest');

    if (!seed) {
        return NextResponse.json({ error: 'Seed and clientId are required' }, { status: 400 });
    }

    return NextResponse.json({
        newMazes: [
            { word: 'hand', maze: maze1 },
            { word: 'frolick', maze: maze2 },
            { word: 'goonies', maze: maze3 },
            { word: 'bird', maze: maze4 },
            { word: 'sky', maze: maze5 },
        ],
    });
}
