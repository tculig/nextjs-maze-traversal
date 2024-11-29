import styled from 'styled-components';

export const RootContainer = styled.div`
    display: flex;
    height: 100%;
`;

export const RightContainer = styled.div`
    flex: 1;
    text-align: center;
    margin-top: 20px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Cell = styled.div<{ $isPlayer: boolean }>`
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ddd;
    background-color: ${({ $isPlayer }) => ($isPlayer ? 'yellow' : 'transparent')};
`;

export const Controls = styled.div`
    margin-top: 20px;
`;

export const Button = styled.button`
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
`;

export const PlayerInfo = styled.div`
    margin-bottom: 20px;

    h2 {
        margin: 0;
    }

    p {
        margin: 5px 0;
    }
`;
