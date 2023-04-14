import { useRef, useState } from "react";
import { apiAddress } from "../utils/constants";
import { useEffect } from "react";

export const useRecord = () => {
    // Get voices when they are loaded
    const [voices, setVoices] = useState([]);
    useEffect(() => {
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            setVoices(voices);
        };

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const [userQuery, setUserQuery] = useState("");
    const [gptResponse, setGptResponse] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    // Browser text to voice
    const talk = (text) => {
        const message = new SpeechSynthesisUtterance();
        message.text = text;
        message.voice = voices.filter((voice) =>
            voice.lang.startsWith("en")
        )[0];
        message.rate = 1;
        message.pitch = 1;
        speechSynthesis.speak(message);
    };

    // Communicating with the API
    const sendAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.wav");

        let res = await fetch(apiAddress, {
            method: "POST",
            body: formData,
        });
        res = await res.json();

        setUserQuery(res.request);
        setGptResponse(res.response);
        talk(res.response);
    };

    // Recording
    const mediaRecorder = useRef(null);

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

    return {
        isRecording,
        startRecording,
        stopRecording,
        userQuery,
        gptResponse,
    };
};
