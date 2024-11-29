import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
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
  color: black;
  transform: scale(0.66); 
  cursor: pointer;
`;
interface MazeProps {
  mazeData: string | undefined,
  onClick: () => void,
}

const MazePreview = ({ mazeData, onClick }: MazeProps) => {
  const mazeGrid = useMemo(() => mazeData ? transformMap(mazeData) : null, [mazeData]);
  const [flipped, setFlipped] = useState(true);

  if (!mazeGrid) return null;

  return (
    <MazeContainer $length={mazeGrid[0]?.length} onClick={() => setFlipped((old) => !old)}>
      {mazeGrid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            value={cell}
            isCurrent={false}
            isPreview={true}
            isPreviewHidden={flipped}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazePreview;
