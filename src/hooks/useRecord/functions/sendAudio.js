import { apiAddress } from "../../../utils/constants";
import { speak } from "./speak";

// Communicating with the API
export const sendAudio = async (
    audioBlob,
    setUserQuery,
    setGptResponse,
    voices
) => {
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
