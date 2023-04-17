export const getStopRecording = (mediaRecorder, setIsRecording) => {
    return () => {
        setIsRecording(false);
        mediaRecorder.current.stop();
    };
};
