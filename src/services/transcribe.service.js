import { apiAddress } from "../utils/constants";

export const transcribe = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    let res = await fetch(apiAddress + "/transcription", {
        method: "POST",
        body: formData,
    });
    res = await res.json();

    return res.data.transcription;
};
