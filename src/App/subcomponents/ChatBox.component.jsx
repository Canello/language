import { useState } from "react";
import { Spacer } from "../../components/Spacer/Spacer.component";
import {
    Box,
    ChatBoxStyled,
    H4,
    IconsContainer,
    LabelContainer,
    LabelWrapper,
    Maximize,
    Minimize,
    Text,
} from "./ChatBox.styles";
import MinimizeIcon from "../../assets/minimize.svg";
import { Loading } from "../../components/Loading/Loading.component";

export const ChatBox = ({ label, isLoading, isActive, children }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const toggleIsMinimized = () => setIsMinimized(!isMinimized);

    return (
        <ChatBoxStyled>
            <LabelContainer>
                <LabelWrapper>
                    <H4>{label}</H4>
                    {isLoading ? (
                        <>
                            <Spacer x={4} />
                            <Loading
                                size={16}
                                thickness={3}
                                bg="#b8cfda"
                                main="#5e8cbb"
                            />
                        </>
                    ) : null}
                </LabelWrapper>
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
                {isLoading ? null : (
                    <Text isMinimized={isMinimized}>{children}</Text>
                )}
            </Box>
        </ChatBoxStyled>
    );
};
