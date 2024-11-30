'use client';

import { RootContainer, RightContainer } from './page.styles';
import { useGenerateMaze } from '@/data/hooks/useMazeGenerator';
import Maze from '../components/Maze';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TraversalState } from '../hooks/useMazeTraverser';
import Controls from '../components/Controls';
import { v4 as uuidv4 } from 'uuid';
import { MazeWithDetails } from '@/types';
import { transformMap } from '../components/utils';
import PlayerInput from '@/components/PlayerInput';

export default function Home() {
  // const { data, isLoading, fetchNextPage, isFetching, hasNextPage } = useGenerateMaze({
  const { data } = useGenerateMaze({
    seed: '3eem2ntt',
    mazesPerRequest: 5,
  });
  const [collectedLetters, setCollectedLetters] = useState<string[]>([]);
  const [pathLetters, setPathLetters] = useState<string[]>([]);
  const [selectedMaze, setSelectedMaze] = useState<MazeWithDetails | undefined>();
  const [mazesData, setMazesData] = useState<MazeWithDetails[]>([]);
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const mazeRef = useRef<React.ElementRef<typeof Maze>>(null);

  const handleUpdate = useCallback(({ collectedLetters, isTraversing, pathLetters }: TraversalState) => {
    setCollectedLetters([...collectedLetters]);
    setPathLetters([...pathLetters]);
    setIsTraversing(isTraversing);
  }, []);

  const startTraversal = useCallback(() => {
    setIsTraversing(true);
  }, [])

  useEffect(() => {
    const lastPage = data?.pages[data.pages.length - 1];
    if (lastPage) {
      setMazesData(data => ([
        ...data,
        ...lastPage?.newMazes.map(newMaze => ({
          mazeDefinition: transformMap(newMaze.maze),
          solution: newMaze.word,
          isSolved: false,
          mazeId: uuidv4(),
        }))
      ]));
    }
  }, [data]);

  useEffect(() => {
    if (mazesData && mazesData.length > 0 && selectedMaze === undefined) {
      setSelectedMaze(mazesData[0]);
    }
  }, [mazesData, selectedMaze]);

  const selectMaze = useCallback((selectedMazeId: string) => {
    if (mazeRef.current) {
      mazeRef.current.stopMazeTraversal();
    }
    setSelectedMaze(mazesData.find(el => el.mazeId === selectedMazeId));
  }, [mazesData])

  const resetMaze = useCallback(() => {
    if (mazeRef.current) {
      mazeRef.current.resetMaze();
    }
  }, []);

  const handleComplete = useCallback(() => {
    if (mazeRef.current) {
      mazeRef.current.revealMaze();
    }
    setMazesData(mazeData => {
      const updatedMazeData = [...mazeData];
      for (let i = 0; i < updatedMazeData.length; i++) {
        if (updatedMazeData[i].mazeId === selectedMaze?.mazeId) {
          updatedMazeData[i].isSolved = true;
        }
      }
      return updatedMazeData;
    })
  }, [selectedMaze?.mazeId])

  return (
    <RootContainer>
      <CollapsibleSidebar
        mazeArray={mazesData}
        selectMaze={selectMaze}
      />
      <RightContainer>
        <Maze
          ref={mazeRef}
          mazeData={selectedMaze}
          handleUpdate={handleUpdate}
          isTraversalTrigered={isTraversing}
        />
        <Controls
          collectedLetters={collectedLetters}
          onStart={startTraversal}
          isTraversing={isTraversing}
          pathLetters={pathLetters}
          resetMaze={resetMaze}
        />
        <PlayerInput
          onComplete={handleComplete}
          targetWord={selectedMaze?.solution}
          disabled={!isTraversing}
        />
      </RightContainer>
    </RootContainer>
  );
}
