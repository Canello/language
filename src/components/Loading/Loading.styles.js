import styled from "styled-components";

export const LoadingStyled = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 100%;
    border: ${({ thickness, bg }) => thickness + "px solid " + bg};
    border-bottom-color: ${({ main }) => main};
    animation: loading-spinner 1.25s linear infinite;

    @keyframes loading-spinner {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;
