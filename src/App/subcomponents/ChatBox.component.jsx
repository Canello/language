import { ChatBoxStyled, Text } from "./ChatBox.styles";

export const ChatBox = ({ children }) => {
    return (
        <ChatBoxStyled>
            <Text>{children}</Text>
        </ChatBoxStyled>
    );
};
