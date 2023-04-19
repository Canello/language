// Main
export const speak = (text, voice, onSpeakEnd) => {
    const chunks = getChunks(text);
    const synths = [];
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const isLastChunk = i === chunks.length - 1;
        const synth = speakChunk(chunk, voice, isLastChunk, onSpeakEnd);
        synths.push(synth);
    }
    return () => cancelSpeaking(synths, onSpeakEnd);
};

// Functions
function getChunks(text) {
    const chunks = [];
    let i = 0;

    while (i < text.length - 1) {
        const { chunk, lastIndex } = getChunk(text, i);
        chunks.push(chunk);
        i = lastIndex;
    }

    return chunks;
}

function getChunk(text, currentIndex) {
    const chunkMaxLength = 200;

    // try to get next periods
    const periods = getPeriods(text, currentIndex, chunkMaxLength);
    let chunk = periods.chunk;
    let lastIndex = periods.lastIndex;

    // if it's only one period, bigger than chunkMaxLength, get the next words
    if (!chunk) {
        const words = getWords(text, currentIndex, chunkMaxLength);
        chunk = words.chunk;
        lastIndex = words.lastIndex;
    }

    // if it's only one word, bigger than chunkMaxLength, get a slice of the word
    if (!chunk) {
        const slice = getSlice(text, currentIndex, chunkMaxLength);
        chunk = slice.chunk;
        lastIndex = slice.lastIndex;
    }

    return { chunk, lastIndex };
}

function getPeriods(text, currentIndex, chunkMaxLength) {
    const periodSeparators = [".", "?", "!"];
    const { chunk, lastIndex } = getChunkBySeparators(
        text,
        currentIndex,
        chunkMaxLength,
        periodSeparators
    );
    return { chunk, lastIndex };
}

function getWords(text, currentIndex, chunkMaxLength) {
    const wordSeparators = [" ", ",", ".", "?", "!"];
    const { chunk, lastIndex } = getChunkBySeparators(
        text,
        currentIndex,
        chunkMaxLength,
        wordSeparators
    );
    return { chunk, lastIndex };
}

function getSlice(text, currentIndex, chunkMaxLength) {
    const maxIndex = currentIndex + chunkMaxLength - 1;
    const chunk = text.slice(currentIndex, maxIndex + 1);
    return { chunk, lastIndex: maxIndex };
}

function getChunkBySeparators(text, currentIndex, chunkMaxLength, separators) {
    let chunk = "";
    let firstCharIndex = currentIndex;
    let i = currentIndex;

    while (i - currentIndex < chunkMaxLength - 1) {
        if (separators.includes(text[i])) {
            const subchunkAndSeparator = text.slice(firstCharIndex, i + 1);
            chunk += subchunkAndSeparator;
            firstCharIndex = i + 1;
        }
        i++;
    }

    return { chunk, lastIndex: firstCharIndex };
}

function speakChunk(chunk, voice, isLastChunk, onSpeakEnd) {
    const synth = new SpeechSynthesisUtterance();
    synth.text = chunk;
    synth.voice = voice;
    synth.rate = 1;
    synth.pitch = 1;
    if (isLastChunk) listenToSpeakEnd(synth, onSpeakEnd);
    speechSynthesis.speak(synth);
    return synth;
}

function listenToSpeakEnd(synth, onSpeakEnd) {
    synth.addEventListener("end", onSpeakEnd);
}

function cancelSpeaking(synths, onSpeakEnd) {
    for (let synth of synths) {
        synth.removeEventListener("end", onSpeakEnd);
        speechSynthesis.cancel(synth);
    }
}
