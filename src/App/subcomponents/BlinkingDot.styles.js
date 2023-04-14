import styled from "styled-components";

export const BlinkingDotStyled = styled.div`
    position: absolute;
    top: -6px;
    right: -6px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: #e45858;
    animation: blinking-dot 1s linear infinite;

    @keyframes blinking-dot {
        0% {
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
