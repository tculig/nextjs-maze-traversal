'use client';

import { RootContainer, RightContainer } from './page.styles';
import { useGenerateMaze } from '@/data/hooks/useMazeGenerator';
import Maze from '../components/Maze';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import { useCallback, useEffect, useState } from 'react';
import { TraversalState } from '../hooks/useMazeTraverser';
import Controls from '../components/Controls';
import { v4 as uuidv4 } from 'uuid';
import { MazeWithDetails } from '@/types';
import { transformMap } from '../components/utils';

//const generateSeed = () => Math.random().toString(36).substring(2, 10);
// const seed = generateSeed();


export default function Home() {
  /*onst [user, setUser] = useState<{ name: string; score: number; level: number } | null>(null);
   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });*/
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } = useGenerateMaze({
    seed: '3eem2ntt',
    mazesPerRequest: 5,
  });
  const [collectedLetters, setCollectedLetters] = useState<string[]>([]);
  const [pathLetters, setPathLetters] = useState<string[]>([]);
  const [selectedMaze, setSelectedMaze] = useState<MazeWithDetails | null>(null);
  const [mazesData, setMazesData] = useState<Record<string, MazeWithDetails>>({}); // use a hashmap {mazeId: MazeWithDetails}
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const handleUpdate = useCallback(({ collectedLetters, isTraversing, pathLetters }: TraversalState) => {
    setCollectedLetters([...collectedLetters]);
    setPathLetters([...pathLetters]);
    setIsTraversing(isTraversing);
  }, []);

  const startTraversal = useCallback(() => {
    setIsTraversing(true);
  }, [])
  /**
   *  ...lastPage.newMazes.map(newMaze => ({
            [uuidv4()]: {
              mazeDefinition: transformMap(newMaze),
              isSolved: false,
            }
          }))
   */
  useEffect(() => {
    const lastPage = data?.pages[data.pages.length - 1];
    const gg = (lastPage?.newMazes.map(newMaze => ({
      [uuidv4()]: {
        mazeDefinition: transformMap(newMaze),
        isSolved: false,
      }
    })))

    if (lastPage) {
      setMazesData(data => ({
        ...data,
        ...(lastPage?.newMazes.map(newMaze => ({
          [uuidv4()]: {
            mazeDefinition: transformMap(newMaze),
            isSolved: false,
          }
        }))).reduce((acc, obj) => ({ ...acc, ...obj }), {})
      }))
    }
  }, [data]);


  return (
    <RootContainer>
      <CollapsibleSidebar
        mazeArray={mazesData}
        selectMaze={(mazeId) => setSelectedMaze(mazesData[mazeId])}
      />
      <RightContainer>
        <Maze
          mazeData={data?.pages?.[0]?.newMazes[0]}
          handleUpdate={handleUpdate}
          isTraversalTrigered={isTraversing}
        />
        <Controls
          collectedLetters={collectedLetters}
          onStart={startTraversal}
          isTraversing={isTraversing}
          pathLetters={pathLetters}
        />
      </RightContainer>
    </RootContainer>
  );
}
