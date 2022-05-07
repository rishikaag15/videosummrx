const textToAudio = (text) => {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
};

const stopAudio = () => {
    window.speechSynthesis.cancel();
};




const CustomButtons = ({ language, englishTranscript, hindiTranscript, gujaratiTranscript, brailleText }) => {
    const handleAudio = (e) => {
        let lang = e.target.attributes['data-language'].value
        lang === "english" ? textToAudio(englishTranscript) : (lang === 'hindi' ? textToAudio(hindiTranscript) : (lang === 'gujarati' ? textToAudio(gujaratiTranscript) : textToAudio(brailleText)))
    }
    const downloadTxtFile = (e) => {
        const lang = e.target.attributes['data-language'].value
        const element = document.createElement("a");
        const file = new Blob([document.getElementById(lang).innerText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${lang}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <center>
            <button
                className="btn-1"
                type="button"
                data-language={language}
                onClick={handleAudio}
            >
                Speak
            </button>
            <button
                className="btn-1"
                type="button"
                onClick={stopAudio}
            >
                Stop
            </button>
            <button
                className="buttonDownload"
                type="button"
                data-language={language}
                onClick={downloadTxtFile}
            >
                Download
            </button>
        </center>

    )
}

export default CustomButtons