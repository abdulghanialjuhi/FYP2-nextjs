import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
`;

const Input = styled.input`
    height: 0;
    width: 0;
    visibility: hidden;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 35px;
    height: 20px;
    background-color: ${({ $active }) => $active ? 'green' : 'gray'};
    border-radius: 100px;
    position: relative;
    transition: background-color .2s;

    &:active .react-switch-button {
        width: 20px;
    }
`;

const SwitchButton = styled.span`
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    transition: 0.2s;
    background-color: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

    ${Input}:checked + ${Label} & {
        left: calc(100% - 2px);
        transform: translateX(-100%);
    }
`;

const Switch = ({ active, onChange }) => {
    return (
        <SwitchContainer>
        <Input checked={active} onChange={onChange} className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" />
        <Label $active={active} className="react-switch-label" htmlFor={`react-switch-new`}>
            <SwitchButton className={`react-switch-button`} />
        </Label>
        </SwitchContainer>
    );
};

export default Switch;
