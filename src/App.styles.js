import styled from "styled-components";

export const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f9f4e9;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 720px;
    padding: 40px;
`;

export const AudioButton = styled.button`
    width: 72px;
    height: 72px;
    border: none;
    border-radius: 100%;
    background-color: #f98c74;

    &:hover {
        cursor: pointer;
    }
`;

export const Mic = styled.img`
    width: 32px;
    height: 32px;
`;
