import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    // margin-bottom: 20px;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px rgb(221, 221, 221) solid;
    border-radius: 0.375rem;

    &:focus {
        outline: none;
        // border-color: #007bff;
    }
`

const Placeholder = styled.span`
    position: absolute;
    left: 12px;
    top: ${({ $isFocused }) => ($isFocused ? '0px' : '50%')};
    transform: translateY(-50%);
    font-size: ${({ $isFocused }) => ($isFocused ? '13px' : '16px')};
    color:  ${({ $isFocused }) => ($isFocused ? 'var(--color-primary)' : '#aaa;')};
    background-color:  ${({ $isFocused }) => ($isFocused ? '#fff' : '#fff;')};
    transition: top 0.3s, font-size 0.3s, color 0.3s;
    padding: 0 5px;
    pointer-events: none; /* To allow clicking through the placeholder */
`;

const AnimatedInput = ({ placeholderName, ...rest }) => {

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef()
    
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!inputRef.current.value) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        if (inputRef?.current?.value) {
            setIsFocused(true);
        }
    }, [])

    return (
        <InputContainer>
        <StyledInput
            ref={inputRef}
            // className='w-full flex p-3 border border-gray-200 rounded-md focus:outline-none'
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
        />
        <Placeholder $isFocused={isFocused}>{placeholderName}</Placeholder>
        </InputContainer>
    );
};

export default AnimatedInput;
