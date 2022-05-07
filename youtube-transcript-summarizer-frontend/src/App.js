import "./App.css";
import BackendAPI from "./components/BackendApi";




function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Transcript Summarizer</h1>
      </header>
      <pre>
        <div class="line"></div>
      </pre>
      <BackendAPI />

      <footer className="footer">
        Made by - 18102293 Rishika Agarwal and 18102297 Nimra Zafar
      </footer>
    </div>
  );
}

export default App;
