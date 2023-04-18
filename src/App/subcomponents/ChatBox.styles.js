import styled from "styled-components";

const ICON_SIZE = "20px";

export const ChatBoxStyled = styled.div`
    width: 100%;
`;

export const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const IconsContainer = styled.div`
    position: relative;
    height: ${ICON_SIZE};
    width: ${ICON_SIZE};
`;

export const Minimize = styled.img`
    position: absolute;
    height: ${ICON_SIZE};
    width: ${ICON_SIZE};
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }
`;

export const Maximize = styled(Minimize)`
    background: none;
    transform: ${({ isMinimized }) =>
        isMinimized ? "rotate(90deg)" : "rotate(0deg)"};
    transition: all 300ms ease-in-out;
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
    padding: 16px;
    padding-bottom: ${({ isMinimized }) => (isMinimized ? "0" : "16px")};
    border-radius: 4px;
    background-color: ${({ isMinimized }) =>
        isMinimized ? "#ececec" : "#ececec"};
    overflow: hidden;
    transition: all 300ms ease-in-out;
    animation: ${({ isActive }) =>
        isActive ? "glowing-chat-box 2s linear infinite" : "none"};

    @keyframes glowing-chat-box {
        0% {
            border: 2px solid #cae2fd;
        }

        50% {
            border: 2px solid #356fb0;
        }

        100% {
            border: 2px solid #cae2fd;
        }
    }
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
