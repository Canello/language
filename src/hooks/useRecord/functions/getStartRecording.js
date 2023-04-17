import { setupRecording } from "./setupRecording";

export const getStartRecording = (
    mediaRecorder,
    setUserQuery,
    setGptResponse,
    setIsRecording,
    voices
) => {
    return async () => {
        if (!mediaRecorder.current) {
            await setupRecording(
                mediaRecorder,
                setUserQuery,
                setGptResponse,
                voices
            );
        }
        setIsRecording(true);
        mediaRecorder.current.start();
    };
};
