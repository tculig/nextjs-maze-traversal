import { NextResponse } from "next/server";

export async function GET() {
  const maze = [
    ["S", " ", " ", "#", " "],
    ["#", "#", " ", "#", " "],
    [" ", " ", " ", " ", "E"],
    [" ", "#", "#", "#", " "],
    [" ", " ", " ", " ", " "],
  ]; // S = Start, E = End, # = Wall, ' ' = Path

  return NextResponse.json({ maze });
}
