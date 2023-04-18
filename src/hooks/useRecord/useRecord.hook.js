import { useRef, useState } from "react";

// Main
export const useRecord = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);

    if (!mediaRecorder.current) setupRecorder(mediaRecorder, setAudioBlob);

    const startRecording = () => {
        setIsRecording(true);
        mediaRecorder.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorder.current.stop();
    };

    return { startRecording, stopRecording, isRecording, audioBlob };
};

// Functions
async function setupRecorder(mediaRecorder, setAudioBlob) {
    let audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
    });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
    });

    mediaRecorder.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunks);
        setAudioBlob(audioBlob);
        audioChunks = [];
    });
}
