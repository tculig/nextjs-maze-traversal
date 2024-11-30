import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';

type PlayerInputProps = {
    onComplete: () => void; // Callback when input is completed
    targetWord: string | undefined;
    disabled: boolean;
};

const Container = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

const PlayerInput: React.FC<PlayerInputProps> = ({ onComplete, targetWord, disabled }) => {
    const [values, setValues] = useState<string[]>([]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        // Update the value for the current box
        const updatedValues = [...values];
        updatedValues[index] = value.slice(-1); // Only keep the last character typed
        setValues(updatedValues);

        // Move to the next box if available
        if (targetWord && value && index < targetWord?.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // Call onComplete if all boxes are filled
        if (updatedValues.join('').toLowerCase() === targetWord?.toLowerCase()) {
            onComplete();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            // Move to the previous box if it's empty
            inputsRef.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if (!disabled) {
            if (targetWord) setValues(Array(targetWord.length).fill(''));
            inputsRef.current[0]?.focus();
        }
    }, [disabled, targetWord])

    useEffect(() => {
        if (targetWord) {
            setValues(Array(targetWord.length).fill(''));
        }
    }, [targetWord])

    if (!targetWord) return null;

    return (
        <Container>
            {values.map((char, index) => (
                <input
                    disabled={disabled}
                    key={index}
                    ref={(el) => {
                        if (el) {
                            inputsRef.current[index] = el;
                        }
                    }}
                    type="text"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{
                        width: '40px',
                        height: '40px',
                        textAlign: 'center',
                        fontSize: '24px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            ))}
        </Container>
    );
};

export default PlayerInput;
