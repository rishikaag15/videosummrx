import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import { Notyf } from "notyf"
import 'notyf/notyf.min.css';

// Create an instance of Notyf

const RealTimeAudio = ({ handleSummarizeText }) => {
    const notyf = new Notyf();
    const handleSpeech = ()=>{
        SpeechRecognition.startListening({continuous: true})
    }
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    const summarize = () => {
        if (transcript) {
            handleSummarizeText(transcript)
        }
        else {
            notyf.error("Please provide some input")
        }
    }
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    else {
        return (
            <main>
                <p>Microphone: <span style={{ backgroundColor: listening ? "green" : "red", color: "white",padding: "0px 5px 0px 5px" }}>{listening ? "on" : "off"}</span></p>
                <button className="btn" onClick={handleSpeech}>Start</button>
                <button className="btn" onClick={SpeechRecognition.stopListening}>Stop</button>
                <button className="btn" onClick={resetTranscript}>Reset</button>
                <p className="mictranscript">{transcript}</p><br />
                <button onClick={summarize}>Summarize</button>
            </main>
        )
    }
}


export default RealTimeAudio