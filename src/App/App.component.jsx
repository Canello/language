import { AppStyled, H1, Main, TopContainer } from "./App.styles";
import { Spacer } from "../components/Spacer/Spacer.component";
import { AudioButton } from "./subcomponents/AudioButton.component";
import { ChatBox } from "./subcomponents/ChatBox.component";
import { useConversation } from "../hooks/useConversation/useConversation.hook";

function App() {
    const {
        startRecording,
        stopRecording,
        isRecording,
        query,
        isLoadingQuery,
        response,
        isLoadingResponse,
        isSpeaking,
    } = useConversation();

    return (
        <AppStyled>
            <Main>
                <TopContainer>
                    <H1>Teste teste teste</H1>
                    <AudioButton
                        isRecording={isRecording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                    />
                </TopContainer>
                <Spacer y={20} />
                <ChatBox label="Você" isLoading={isLoadingQuery}>
                    {query}
                </ChatBox>
                <Spacer y={20} />
                <ChatBox
                    label="Caitlyn"
                    isLoading={isLoadingResponse}
                    isActive={isSpeaking}
                >
                    {response}
                </ChatBox>
            </Main>
        </AppStyled>
    );
}

export default App;
