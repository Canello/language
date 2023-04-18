import styled from "styled-components";

export const AudioButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 100%;
    background-color: #f98c74;

    &:hover {
        cursor: pointer;
        background-color: #ec826a;
    }

    &:active {
        background-color: #ec826a;
    }
`;

export const Mic = styled.img`
    width: 26px;
    height: 26px;
`;
