import { NextResponse } from "next/server";

export async function GET() {
  const userInfo = {
    name: "Maze Explorer",
    score: 100,
    level: 1,
  };

  return NextResponse.json(userInfo);
}
