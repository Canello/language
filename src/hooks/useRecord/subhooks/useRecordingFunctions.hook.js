import { useRef } from "react";
import { getStartRecording } from "../functions/getStartRecording";
import { getStopRecording } from "../functions/getStopRecording";

export const useRecordingFunctions = (
    setUserQuery,
    setGptResponse,
    setIsRecording,
    voices
) => {
    const mediaRecorder = useRef(null);
    const startRecording = getStartRecording(
        mediaRecorder,
        setUserQuery,
        setGptResponse,
        setIsRecording,
        voices
    );
    const stopRecording = getStopRecording(mediaRecorder, setIsRecording);
    return { startRecording, stopRecording };
};
