import { useRef, useState } from "react";
import { apiAddress } from "./utils/constants";

import { AppStyled, AudioButton, Main, Mic } from "./App.styles";
import MicIcon from "./assets/mic.svg";

function App() {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef(null);

    const sendAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.wav");

        let res = await fetch(apiAddress, {
            method: "POST",
            body: formData,
        });
        res = await res.json();
        res = res.response;
    };

    const setupRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        mediaRecorder.current = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.current.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
        });

        mediaRecorder.current.addEventListener("stop", async () => {
            // Aparentemente audioChunks é uma referência fixa aqui, e, mesmo quando eu reseto, aqui continua referenciando o antigo
            const audioBlob = new Blob(audioChunks);
            await sendAudio(audioBlob);
            audioChunks = [];
        });
    };

    const startRecording = async () => {
        if (!mediaRecorder.current) await setupRecording();
        setIsRecording(true);
        mediaRecorder.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorder.current.stop();
    };

    return (
        <AppStyled>
            <Main>
                {isRecording ? (
                    <>
                        <h2>rec</h2>
                        <AudioButton onClick={stopRecording}>
                            <Mic src={MicIcon} />
                        </AudioButton>
                    </>
                ) : (
                    <AudioButton onClick={startRecording}>
                        <Mic src={MicIcon} />
                    </AudioButton>
                )}
            </Main>
        </AppStyled>
    );
}

export default App;
