import { NextRequest, NextResponse } from 'next/server';
import seedrandom from 'seedrandom';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const seed = url.searchParams.get('seed');

    if (!seed) {
        return NextResponse.json({ error: 'Seed and clientId are required' }, { status: 400 });
    }

    // Initialize PRNG with the seed
    const rng = seedrandom(seed);

    // Generate a new random number based on the seed and track it
    const newRandom = Math.floor(rng() * 100); // Generate a random number (0-99)

    return NextResponse.json({
        newRandom,
    });
}
