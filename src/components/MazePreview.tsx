import React, { useMemo } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { transformMap } from './utils';
import { MazeWithDetails } from '@/types';

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
  mazeData: MazeWithDetails | undefined,
}

const MazePreview = ({ mazeData }: MazeProps) => {

  if (!mazeData) return null;

  return (
    <MazeContainer $length={mazeData.mazeDefinition[0]?.length} >
      {mazeData.mazeDefinition.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            value={cell}
            isCurrent={false}
            isPreview={true}
            isPreviewHidden={!mazeData.isSolved}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazePreview;
