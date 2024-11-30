import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import useMazeTraverser, { TraversalState } from '../hooks/useMazeTraverser';
import { transformMap } from './utils';
/*
const mazeData = [
  ['', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '|', '', '', '+', '-', '-', '+', '', '', '', ''],
  ['', '', '', '', '', 'A', '', '', '|', '', '', 'C', '', '', '', ''],
  ['', '@', '-', '-', '-', '|', '-', '-', '-', '-', 'E', '|', '-', '-', '+', ''],
  ['', '', '', '', '', '|', '', '', '|', '', '', '|', '', '', 'D', ''],
  ['', '', '', '', '', '+', 'B', '-', '+', '', '', '+', '-', '-', '+', ''],
];
*/
/*
const mazeData = `
 +-L-+  
 |  +A-+
@B+ ++ H
 ++    x`;
*/

const MazeContainer = styled.div<{ $length: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $length }) => $length}, 20px);
  grid-gap: 1px;
  justify-content: center;
  margin-bottom: 20px;
`;
interface MazeProps {
  mazeData: string | undefined,
  handleUpdate: (props: TraversalState) => void,
  isTraversalTrigered: boolean,
}

const MazePreview = ({ mazeData, handleUpdate, isTraversalTrigered }: MazeProps) => {
  const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(null);

  const mazeGrid = useMemo(() => mazeData ? transformMap(mazeData) : null, [mazeData]);
  const handleUpdateInternal = useCallback((props: TraversalState) => {
    setCurrentPosition(props.currentPosition);
    handleUpdate(props);
  }, [handleUpdate]);

  const { startTraversal } = useMazeTraverser(mazeGrid ?? [], handleUpdateInternal);

  useEffect(() => {
    if (isTraversalTrigered) startTraversal();
  }, [isTraversalTrigered, startTraversal])

  if (!mazeGrid) return null;

  return (
    <MazeContainer $length={mazeGrid[0]?.length}>
      {mazeGrid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            value={cell}
            isCurrent={currentPosition?.x === x && currentPosition?.y === y}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazePreview;
