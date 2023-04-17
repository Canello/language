import { useState } from "react";
import { useVoices } from "./subhooks/useVoices.hook";
import { useRecordingFunctions } from "./subhooks/useRecordingFunctions";

export const useRecord = () => {
    const [userQuery, setUserQuery] = useState("");
    const [gptResponse, setGptResponse] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    // Get voices when they are loaded
    const voices = useVoices();

    // Recording functions
    const { startRecording, stopRecording } = useRecordingFunctions(
        setUserQuery,
        setGptResponse,
        setIsRecording,
        voices
    );

    return {
        isRecording,
        startRecording,
        stopRecording,
        userQuery,
        gptResponse,
    };
};
