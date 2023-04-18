import { useEffect } from "react";
import { transcribe } from "../../services/transcribe.service";
import { useApi } from "../useApi/useApi.hook";
import { useRecord } from "../useRecord/useRecord.hook";
import { talkToGpt } from "../../services/talkToGpt.service";
import { useSpeak } from "../useSpeak/useSpeak.hook";

export const useConversation = () => {
    const { startRecording, stopRecording, isRecording, audioBlob } =
        useRecord();
    const { speak, isSpeaking } = useSpeak();
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
        fetchGptResponse(transcription);
    }, [transcription]);

    // Speak gpt response everytime a new gpt response is generated
    useEffect(() => {
        if (!gptResponse) return;
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
