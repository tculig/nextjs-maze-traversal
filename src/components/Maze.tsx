import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import useMazeTraverser, { Position, TraversalState } from '../hooks/useMazeTraverser';
import { MazeWithDetails } from '@/types';


const MazeContainer = styled.div<{ $length: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $length }) => $length}, 20px);
  grid-gap: 1px;
  justify-content: center;
  margin-bottom: 20px;
`;
interface MazeProps {
  mazeData: MazeWithDetails | undefined,
  handleUpdate: (props: TraversalState) => void,
  isTraversalTrigered: boolean,
}

type ChildHandle = {
  stopMazeTraversal: () => void;
  resetMaze: () => void;
  revealMaze: () => void;
};

const Maze = forwardRef<ChildHandle, MazeProps>(({ mazeData, handleUpdate, isTraversalTrigered }: MazeProps, ref) => {
  const [visitedTiles, setVisitedTiles] = useState<Position[]>([]);
  const [revealDelay, setRevealDelay] = useState(150);
  const handleUpdateInternal = useCallback((props: TraversalState) => {
    if (props.currentPosition) {
      setVisitedTiles(visited => [
        ...visited,
        props.currentPosition!
      ]);
    }
    handleUpdate(props);
  }, [handleUpdate]);

  const { startTraversal, stopTraversal } = useMazeTraverser(mazeData?.mazeDefinition ?? [], revealDelay, handleUpdateInternal);

  useImperativeHandle(ref, () => ({
    stopMazeTraversal: () => stopTraversal(),
    resetMaze: () => setVisitedTiles([]),
    revealMaze: () => setRevealDelay(0)
  }));

  useEffect(() => {
    if (isTraversalTrigered) {
      setRevealDelay(150);
      startTraversal();
    }
  }, [isTraversalTrigered, startTraversal])

  useEffect(() => {
    setVisitedTiles([]);
  }, [mazeData])

  if (!mazeData) return null;

  return (
    <MazeContainer $length={mazeData?.mazeDefinition[0]?.length}>
      {mazeData?.mazeDefinition.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${mazeData.mazeId}-${x}-${y}`}
            x={x}
            y={y}
            value={cell}
            // isCurrent={currentPosition?.x === x && currentPosition?.y === y}
            isCurrent={false}
            isPreviewHidden={!visitedTiles.find(el => el.x === x && el.y === y)}
          />
        ))
      )}
    </MazeContainer>
  );
});

Maze.displayName = 'Maze';

export default Maze;
