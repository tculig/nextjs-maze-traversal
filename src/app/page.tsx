'use client';

import { Container } from './page.styles';
import { useGenerateMaze } from '@/data/hooks/useMazeGenerator';
import Maze from './components/Maze';

//const generateSeed = () => Math.random().toString(36).substring(2, 10);
// const seed = generateSeed();

export default function Home() {
  /*onst [user, setUser] = useState<{ name: string; score: number; level: number } | null>(null);
   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });*/
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } = useGenerateMaze({
    seed: '3eem2ntt',
  });

  console.log(data?.pages?.[0]);

  return (
    <Container>
      <Maze mazeData={data?.pages?.[0]?.newMaze} />
    </Container>
  );
}
