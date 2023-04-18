import styled from "styled-components";

export const ChatBoxStyled = styled.div`
    width: 100%;
`;

export const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Minimize = styled.img`
    height: 20px;
    width: 20px;

    &:hover {
        cursor: pointer;
    }
`;

export const H4 = styled.h4`
    color: #99968f;
    font-size: 14px;
    font-weight: 400;
`;

export const Box = styled.div`
    width: 100%;
    min-height: ${({ isMinimized }) => (isMinimized ? "0" : "120px")};
    height: ${({ isMinimized }) => (isMinimized ? "0" : "auto")};
    padding: ${({ isMinimized }) => (isMinimized ? "4px" : "16px")};
    border-radius: 4px;
    background-color: ${({ isMinimized }) =>
        isMinimized ? "#ececec" : "#ececec"};
    overflow: hidden;
    transition: all 300ms ease-in-out;
`;

export const Text = styled.p`
    white-space: pre-wrap;
    color: #002b5b;
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    opacity: ${({ isMinimized }) => (isMinimized ? "0" : "1")};
    transition: all 300ms ease-in-out;
`;
