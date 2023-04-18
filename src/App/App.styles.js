import styled from "styled-components";

export const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background-color: #f9f4e9;
`;

export const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Main = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 720px;
    padding: 40px;
`;

export const H1 = styled.h1`
    color: #002b5b;
    font-size: 24px;
    font-weight: black;
`;
