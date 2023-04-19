import { useEffect, useRef } from "react";
import { transcribe } from "../../services/transcribe.service";
import { useApi } from "../useApi/useApi.hook";
import { useRecord } from "../useRecord/useRecord.hook";
import { talkToGpt } from "../../services/talkToGpt.service";
import { useSpeak } from "../useSpeak/useSpeak.hook";

export const useConversation = () => {
    const messages = useRef([]);

    const { speak, stopSpeaking, isSpeaking } = useSpeak();
    const { startRecording, stopRecording, isRecording, audioBlob } =
        useRecord(stopSpeaking);
    const [
        fetchTranscription,
        transcription,
        isLoadingTranscription,
        errorTranscription,
    ] = useApi(transcribe, "");
    const [
        fetchGptResponse,
        gptResponse,
        isLoadingGptResponse,
        errorGptResponse,
    ] = useApi(talkToGpt, "");

    // Transcribe audio to text everytime a new audio is recorded
    useEffect(() => {
        if (!audioBlob) return;
        fetchTranscription(audioBlob);
    }, [audioBlob]);

    // Get gpt response everytime a new query is transcripted
    useEffect(() => {
        if (!transcription) return;
        messages.current.push({ role: "user", content: transcription });
        fetchGptResponse(messages.current);
    }, [transcription]);

    // Speak gpt response everytime a new gpt response is generated
    useEffect(() => {
        if (!gptResponse) return;
        messages.current.push({ role: "assistant", content: gptResponse });
        speak(gptResponse);
    }, [gptResponse]);

    return {
        startRecording,
        stopRecording,
        isRecording,
        query: transcription,
        isLoadingQuery: isLoadingTranscription,
        errorQuery: errorTranscription,
        response: gptResponse,
        isLoadingResponse: isLoadingGptResponse,
        errorResponse: errorGptResponse,
        isSpeaking,
    };
};
