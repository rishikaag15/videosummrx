import braille from "braille";
import React from "react";
import DefaultPage from "./DefaultPage";
import RealTimeAudio from "./RealTimeAudio";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';
import { Oval } from 'react-loader-spinner'




class BackendAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: null,
      isLoaded: false,
      isLoading: false,
      failedMessage: null,
      notyf: new Notyf()
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSummarizeText = (text) => {
    this.setState({
      isLoading: true,
      isLoaded: false,
    });
    var FinalURL = `http://127.0.0.1:5000/api/v1/summarizetext`;

    fetch(FinalURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text }),
      method: 'POST'
    })
      .then((res) => res.json()) //promises
      .then(
        (result) => {
          //callback
          if (result.data.message === "Success") {
            console.log(result.data)

            this.setState({
              isLoaded: true,
              isLoading: false,
              message: result.data.message,
              englishTranscript: result.data.eng_summary,
              hindiTranscript: result.data.hind_summary,
              gujaratiTranscript: result.data.guj_summary,
              originalTextLength: result.data.original_txt_length,
              summarizedTextLength: result.data.final_summ_length,
              brailleText: braille.toBraille(result.data.eng_summary),
            });
          } else {
            this.setState({
              isLoaded: true,
              isLoading: false,
              failedMessage: result.data.error,
            });
            this.state.notyf.error(result.data.error)
          }
        },

        (error) => {
          //callback
          this.state.notyf.error("Some error occurred in Backend!")
          // alert("An Error occured: " + this.state);
          this.setState({
            isLoaded: true,
            isLoading: false,
            error: error,
          });
        }
      );
  }

  handleSubmit = (event) => {
    this.setState({
      isLoading: true,
      isLoaded: false,
    });
    var FinalURL = `http://127.0.0.1:5000/api/v1/summarizevideo?video_url=${this.state.name}`;

    fetch(FinalURL)
      .then((res) => res.json()) //promises
      .then(
        (result) => {
          //callback
          if (result.data.message === "Success") {
            this.setState({
              isLoaded: true,
              isLoading: false,
              message: result.data.message,
              englishTranscript: result.data.eng_summary,
              hindiTranscript: result.data.hind_summary,
              gujaratiTranscript: result.data.guj_summary,
              originalTextLength: result.data.original_txt_length,
              summarizedTextLength: result.data.final_summ_length,
              brailleText: braille.toBraille(result.data.eng_summary),
            });
          } else {
            this.setState({
              isLoaded: true,
              isLoading: false,
              failedMessage: result.data.error,
            });
            this.state.notyf.error(result.data.error)
          }
        },

        (error) => {
          //callback
          // alert("An Error occured: " + this.state);
          this.state.notyf.error("Some error occurred in Backend!")
          this.setState({
            isLoaded: true,
            isLoading: false,
            error: error,
          });
        }
      );

    event.preventDefault(); //prevent refresh pg
  };

  render() {
    const {
      englishTranscript,
      hindiTranscript,
      gujaratiTranscript,
      brailleText,
      originalTextLength,
      summarizedTextLength,
    } = this.state; //object destructring
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Video URL:</label>
          <input
            className="input-1"
            type="url"
            value={this.state.value}
            placeholder="Paste your YouTube Video link here."
            name="name"
            onChange={this.handleChange}
            required
            autoComplete="off"
          />
          <button className="submit-1" type="submit">Summarize{this.state.isLoading ?
            (<Oval color="#00BFFF" height={30} width={30} wrapperClass="loader"/>) : ''}
          </button>
        </form>
        <p>
          {originalTextLength ? originalTextLength : 'OriginalTextLength'}
          <i className="arrow right"></i>
          {summarizedTextLength ? summarizedTextLength : 'SummarizedTextLength'}
        </p>
        <DefaultPage hindiTranscript={hindiTranscript} englishTranscript={englishTranscript} gujaratiTranscript={gujaratiTranscript} brailleText={brailleText} />
        <RealTimeAudio handleSummarizeText={this.handleSummarizeText} />

      </>
    );
  }
}

export default BackendAPI;
