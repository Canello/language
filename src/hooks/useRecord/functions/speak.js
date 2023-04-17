export const speak = (text, voices) => {
    const chunks = getChunks(text);
    const englishVoice = getEnglishVoice(voices);
    chunks.forEach((chunk) => speakChunk(chunk, englishVoice));
};

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

function getSlice(text, currentIndex, chunkMaxLength) {
    const maxIndex = currentIndex + chunkMaxLength - 1;
    const chunk = text.slice(currentIndex, maxIndex + 1);
    return { chunk, lastIndex: maxIndex };
}

function getEnglishVoice(voices) {
    return voices.filter((voice) => voice.lang.startsWith("en"))[0];
}

function speakChunk(chunk, voice) {
    const message = new SpeechSynthesisUtterance();
    message.text = chunk;
    message.voice = voice;
    message.rate = 1;
    message.pitch = 1;
    speechSynthesis.speak(message);
}
