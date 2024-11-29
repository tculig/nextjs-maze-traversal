import styled, { css } from 'styled-components';

interface CellProps {
  value: string;
  isCurrent: boolean;
  isPreview?: boolean;
  isPreviewHidden?: boolean;
  x: number;
  y: number;
}

const CellContainer = styled.div.attrs<{ $isPath: boolean; $isLetter: boolean; $isCurrent: boolean, $isPreview: boolean, $isPreviewHidden: boolean, $delay: number }>(
  ({ $isPreviewHidden, $delay }) => ({
    style: {
      transform: `rotateY(${$isPreviewHidden ? '180' : '0'}deg)`,
      transitionDelay: `${$delay}s`
    }
  })
)`
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  ${(props) =>
    props.$isPath &&
    css`
      background-color: #fff;
    `}
  ${(props) =>
    !props.$isPath &&
    css`
      background-color: ${props.$isPreview ? '#e2dfdf' : '#f0f0f0'};
    `}
  ${(props) =>
    props.$isLetter &&
    css`
      background-color: #ffeb3b;
    `}
  ${(props) =>
    props.$isCurrent &&
    css`
      background-color: #8bc34a;
    `}

     &::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background: coral;
         transform: rotateY(180deg);
         backface-visibility: hidden;
           ${(props) =>
    props.$isPath &&
    css`
                background-color: #fff;
              `}
            ${(props) =>
    !props.$isPath &&
    css`
                background-color: ${props.$isPreview ? '#e2dfdf' : '#f0f0f0'};
              `}
            ${(props) =>
    props.$isLetter &&
    css`
                  background-color: #fff;
              `}
       }

`;

const Cell: React.FC<CellProps> = ({ x, y, value, isCurrent, isPreview = false, isPreviewHidden = false }) => {
  const isPath = value === '|' || value === '-' || value === '+' || value === 'x' || value === '@';
  const isLetter = /[A-Z]/.test(value);
  const isPlaceholder = value === '%';
  const delay = Math.sqrt(x ** 2 + y ** 2) * 0.1;

  return (
    <CellContainer $isPath={isPath} $isLetter={isLetter} $isCurrent={isCurrent} $isPreview={isPreview} $isPreviewHidden={isPreviewHidden} $delay={delay}>
      {isPlaceholder ? '' : (value.trim() ? value : '')}
    </CellContainer>
  );
};

export default Cell;
