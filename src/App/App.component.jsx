import { AppStyled, H1, H4, Main } from "./App.styles";
import { Spacer } from "../components/Spacer/Spacer.component";
import { AudioButton } from "./subcomponents/AudioButton.component";
import { ChatBox } from "./subcomponents/ChatBox.component";
import { useRecord } from "../hooks/useRecord.hook";

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
                <H1>Teste teste teste</H1>
                <Spacer y={32} />
                <H4>Você</H4>
                <Spacer y={4} />
                <ChatBox>{userQuery}</ChatBox>
                <Spacer y={20} />
                <H4>Caitlyn</H4>
                <Spacer y={4} />
                <ChatBox>{gptResponse}</ChatBox>
                <Spacer y={32} />
                <AudioButton
                    isRecording={isRecording}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                />
            </Main>
        </AppStyled>
    );
}

export default App;
