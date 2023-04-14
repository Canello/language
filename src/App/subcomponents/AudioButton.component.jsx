import { AudioButtonStyled, Mic } from "./AudioButton.styles";
import MicIcon from "../../assets/mic.svg";
import { BlinkingDot } from "./BlinkingDot.component";

export const AudioButton = ({ isRecording, startRecording, stopRecording }) => {
    const onClick = isRecording ? stopRecording : startRecording;

    return (
        <AudioButtonStyled onClick={onClick}>
            <Mic src={MicIcon} />
            {isRecording ? <BlinkingDot /> : null}
        </AudioButtonStyled>
    );
};
