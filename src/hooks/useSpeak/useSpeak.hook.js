import { useState } from "react";
import { useVoice } from "./subhooks/useVoice.hook";
import { speak } from "./utils/speak";

export const useSpeak = () => {
    const voice = useVoice();

    const [isSpeaking, setIsSpeaking] = useState(false);
    const startSpeaking = () => setIsSpeaking(true);
    const stopSpeaking = () => setIsSpeaking(false);

    const speakFunc = (text) => {
        startSpeaking();
        speak(text, voice, stopSpeaking);
    };

    return {
        speak: speakFunc,
        isSpeaking: isSpeaking,
    };
};
