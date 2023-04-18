import { useState } from "react";
import { Spacer } from "../../components/Spacer/Spacer.component";
import {
    Box,
    ChatBoxStyled,
    H4,
    IconsContainer,
    LabelContainer,
    Maximize,
    Minimize,
    Text,
} from "./ChatBox.styles";
import MinimizeIcon from "../../assets/minimize.svg";

export const ChatBox = ({ label, isActive, children }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const toggleIsMinimized = () => setIsMinimized(!isMinimized);

    return (
        <ChatBoxStyled>
            <LabelContainer>
                <H4>{label}</H4>
                <IconsContainer>
                    <Minimize onClick={toggleIsMinimized} src={MinimizeIcon} />
                    <Maximize
                        onClick={toggleIsMinimized}
                        src={MinimizeIcon}
                        isMinimized={isMinimized}
                    />
                </IconsContainer>
            </LabelContainer>
            <Spacer y={4} />
            <Box isMinimized={isMinimized} isActive={isActive ?? false}>
                <Text isMinimized={isMinimized}>{children}</Text>
            </Box>
        </ChatBoxStyled>
    );
};
