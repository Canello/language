import { useState } from "react";
import { Spacer } from "../../components/Spacer/Spacer.component";
import {
    Box,
    ChatBoxStyled,
    H4,
    LabelContainer,
    Minimize,
    Text,
} from "./ChatBox.styles";
import MinimizeIcon from "../../assets/minimize.svg";

export const ChatBox = ({ label, children }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const toggleIsMinimized = () => setIsMinimized(!isMinimized);

    return (
        <ChatBoxStyled>
            <LabelContainer>
                <H4>{label}</H4>
                <Minimize onClick={toggleIsMinimized} src={MinimizeIcon} />
            </LabelContainer>
            <Spacer y={4} />
            <Box isMinimized={isMinimized}>
                <Text isMinimized={isMinimized}>{children}</Text>
            </Box>
        </ChatBoxStyled>
    );
};
