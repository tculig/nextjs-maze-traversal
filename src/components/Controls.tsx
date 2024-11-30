import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ControlsProps {
    collectedLetters: string[];
    pathLetters: string[];
    onStart: () => void;
    isTraversing: boolean;
    resetMaze: () => void;
}

const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 16px;
`;

const CollectedLetters = styled.p`
  font-size: 18px;
`;

const Controls: React.FC<ControlsProps> = ({ collectedLetters, pathLetters, onStart, isTraversing, resetMaze }) => {
    const [buttonActive, setButtonActive] = useState(true);
    const [buttonText, setButtonText] = useState("Start Traversal");
    const traversalTimeoutRef = useRef<number | null>(null);
    const countdown = useRef<number | null>(null);

    useEffect(() => {
        setButtonText(isTraversing ? 'Traversing...' : 'Start Traversal');
        setButtonActive(isTraversing ? false : true);
    }, [isTraversing]);

    const decrementCountdown = useCallback(() => {
        if (!countdown.current) return;
        countdown.current = countdown.current - 1;
        if (countdown.current !== 0) {
            setButtonText(`${countdown.current}...`);
            window.setTimeout(decrementCountdown, 1000);
        } else {
            setButtonText('Traversing...');
            onStart();
        }
    }, [onStart])

    const startTimeout = useCallback(() => {
        countdown.current = 3;
        setButtonActive(false);
        setButtonText(`${countdown.current}...`);
        traversalTimeoutRef.current = window.setTimeout(decrementCountdown, 1000);
        resetMaze();
    }, [decrementCountdown, resetMaze])

    //cleanup
    useEffect(() => {
        return () => {
            if (traversalTimeoutRef.current !== null) {
                clearTimeout(traversalTimeoutRef.current);
            }
        }
    }, []);

    return (
        <>
            <Button onClick={startTimeout} disabled={!buttonActive}>
                {buttonText}
            </Button>
            <CollectedLetters>
                Letters: {collectedLetters.join('')}
            </CollectedLetters>
            <CollectedLetters>
                Path as characters : {pathLetters.join('')}
            </CollectedLetters>
        </>
    );
};

export default Controls;
