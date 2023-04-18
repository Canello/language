import { AppStyled, H1, Main, TopContainer } from "./App.styles";
import { Spacer } from "../components/Spacer/Spacer.component";
import { AudioButton } from "./subcomponents/AudioButton.component";
import { ChatBox } from "./subcomponents/ChatBox.component";
import { useRecord } from "../hooks/useRecord/useRecord.hook";

function App() {
    const {
        isRecording,
        startRecording,
        stopRecording,
        userQuery,
        gptResponse,
    } = useRecord();

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
                <ChatBox label="Você">{userQuery}</ChatBox>
                <Spacer y={20} />
                <ChatBox label="Caitlyn">{gptResponse}</ChatBox>
            </Main>
        </AppStyled>
    );
}

export default App;
