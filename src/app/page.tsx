'use client';

import { useState, useEffect } from 'react';
import { Container, Maze, Row, Cell, Controls, Button, PlayerInfo } from './page.styles';
import { useGenerateMaze } from '@/data/hooks/useMazeGenerator';

type Maze = string[][];
type Position = { x: number; y: number };
const generateSeed = () => Math.random().toString(36).substring(2, 10);
const seed = generateSeed();

export default function Home() {
  const [maze, setMaze] = useState<Maze>([]);
  const [user, setUser] = useState<{ name: string; score: number; level: number } | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } = useGenerateMaze({
    seed,
  });

  console.log(data?.pages?.[0]);

  useEffect(() => {
    // Fetch maze data
    fetch('/api/getMaze')
      .then((res) => res.json())
      .then((data) => setMaze(data.maze));

    // Fetch user info
    fetch('/api/getUserInfo')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const movePlayer = (dx: number, dy: number) => {
    if (!maze.length) return;

    const newX = position.x + dx;
    const newY = position.y + dy;

    // Check boundaries and wall collisions
    if (
      newX >= 0 &&
      newX < maze.length &&
      newY >= 0 &&
      newY < maze[0].length &&
      maze[newX][newY] !== '#'
    ) {
      setPosition({ x: newX, y: newY });

      // Check if the player reached the end
      if (maze[newX][newY] === 'E') {
        alert('You completed the maze!');
      }
    }
  };

  return (
    <Container>
      <h1>Maze Traversal Game</h1>
      {user && (
        <PlayerInfo>
          <h2>Player: {user.name}</h2>
          <p>Score: {user.score}</p>
          <p>Level: {user.level}</p>
        </PlayerInfo>
      )}
      <Maze>
        {maze.map((row, x) => (
          <Row key={x}>
            {row.map((cell, y) => (
              <Cell key={y} $isPlayer={position.x === x && position.y === y}>
                {cell === '#' ? '🟦' : cell === 'E' ? '🚩' : '⬜'}
              </Cell>
            ))}
          </Row>
        ))}
      </Maze>
      <Controls>
        <Button onClick={() => movePlayer(-1, 0)}>Up</Button>
        <Button onClick={() => movePlayer(1, 0)}>Down</Button>
        <Button onClick={() => movePlayer(0, -1)}>Left</Button>
        <Button onClick={() => movePlayer(0, 1)}>Right</Button>
      </Controls>
    </Container>
  );
}
