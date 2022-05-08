import braille from "braille";
// import ET from "../transcripts/English.txt";
// import HT from "../transcripts/Hindi.txt";
// import GT from "../transcripts/Gujarati.txt";
import Tabs from "./Tabs";
import CustomButtons from "./CustomButtons";




const DefaultPage = ({ hindiTranscript, englishTranscript, gujaratiTranscript, brailleText }) => {
    return (
        <Tabs>
            <div label="English">
                <div className="tab-content-1">
                    {englishTranscript ? (
                        <div>
                            <CustomButtons language={'english'} englishTranscript={englishTranscript} hindiTranscript={hindiTranscript} gujaratiTranscript={gujaratiTranscript} brailleText={brailleText} />
                            <div className="transcript" id="english">
                                {englishTranscript}
                            </div>
                        </div>
                    ) : (
                        "English Summarized Text Will be Shown Here..."
                    )}
                </div>
            </div><div label="Hindi">
                <div className="tab-content-1">
                    {hindiTranscript ? (
                        <div>
                            <CustomButtons language={'hindi'} englishTranscript={englishTranscript} hindiTranscript={hindiTranscript} gujaratiTranscript={gujaratiTranscript} brailleText={brailleText} />
                            <div className="transcript" id="hindi">
                                {hindiTranscript}
                            </div>

                        </div>
                    ) : (
                        "Hindi Summarized Text Will be Shown Here..."
                    )
                    }
                </div>
            </div><div label="Gujarati">
                <div className="tab-content-1">
                    {gujaratiTranscript ?
                        (
                            <div>
                                <CustomButtons language={'gujarati'} englishTranscript={englishTranscript} hindiTranscript={hindiTranscript} gujaratiTranscript={gujaratiTranscript} brailleText={brailleText} />
                                <div className="transcript" id="gujarati">
                                    {gujaratiTranscript}
                                </div>
                            </div>
                        ) :
                        (
                            "Gujarati Summarized Text Will be Shown Here..."
                        )}
                </div>
            </div>
            <div label="Braille">
                <div className="tab-content-1">
                    {brailleText ?
                        (
                            <div>
                                <CustomButtons language={'braille'} englishTranscript={englishTranscript} hindiTranscript={hindiTranscript} gujaratiTranscript={gujaratiTranscript} brailleText={brailleText} />
                                <div className="transcript" id="braille">
                                    {brailleText}
                                </div>
                            </div>
                        ) : (
                            braille.toBraille(
                                "Braille Summarized Text Will be Shown Here..."
                            )
                        )}
                </div>
            </div>
        </Tabs>
    )
}

export default DefaultPage;