import { apiAddress } from "../utils/constants";

export const talkToGpt = async (messages) => {
    let res = await fetch(apiAddress + "/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages,
        }),
    });
    res = await res.json();

    return res.data.reply;
};
