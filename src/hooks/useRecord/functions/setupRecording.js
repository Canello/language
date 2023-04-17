import { sendAudio } from "./sendAudio";

export const setupRecording = async (
    mediaRecorder,
    setUserQuery,
    setGptResponse,
    voices
) => {
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
        await sendAudio(audioBlob, setUserQuery, setGptResponse, voices);
        audioChunks = [];
    });
};
