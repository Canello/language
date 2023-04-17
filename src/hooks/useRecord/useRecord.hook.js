import { useRef, useState } from "react";
import { apiAddress } from "../../utils/constants";
import { useEffect } from "react";
import { speak } from "./functions/speak";

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
        speak(res.response, voices);
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
