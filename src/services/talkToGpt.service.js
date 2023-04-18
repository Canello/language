import { apiAddress } from "../utils/constants";

export const talkToGpt = async (query) => {
    let res = await fetch(apiAddress + "/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    });
    res = await res.json();

    return res.data.reply;
};
