import "./App.css";
import BackendAPI from "./components/BackendApi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();

// function getScript() {
// 	let result = "";
// 	recognition.start();
// 	recognition.addEventListener("result", (e) => {
// 	console.log("Started")
// 	  const transcript = Array.from(e.results)
// 		.map((result) => result[0])
// 		.map((result) => result.transcript)
// 		.join("");

// 	  result = transcript;
// 	  console.log(result);
// 	});

// 	recognition.addEventListener("end",()=> console.log("Stopped"));
// 	// recognition.addEventListener("end",recognition.start);
//   }

//   function stopRecording(){
// 	  recognition.stop()
//   }

//   function startRecording(){
// 		recognition.start();
//   }

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Transcript Summarizer</h1>
        <pre>
          <div class="line"></div>
        </pre>
        <BackendAPI />
      </header>
      <main>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </main>
      <footer className="footer">
        Made by - 18102293 Rishika Agarwal and 18102297 Nimra Zafar
      </footer>
    </div>
  );
}

export default App;
