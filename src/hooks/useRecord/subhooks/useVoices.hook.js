import { useEffect, useState } from "react";

export const useVoices = () => {
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

    return voices;
};
