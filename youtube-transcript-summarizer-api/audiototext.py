import pytube
import os
import time
# import required modules
import subprocess
import azure.cognitiveservices.speech as speechsdk


FFMPEG_PATH = 'C:\\Softwares\\ffmpeg-2022-05-04-git-0914e3a14a-full_build\\bin'
DESTINATION_WAV_PATH = 'C:\\Projects\\videosummrx\\youtube-transcript-summarizer-api\\tempaudios\\temp.wav'


def recognize_from_file(src):
    speech_config = speechsdk.SpeechConfig(
        subscription="3b644e401c8d41abbf08efaad7c46f7f", region="eastus")
    speech_config.speech_recognition_language = "en-US"

    # To recognize speech from an audio file, use `filename` instead of `use_default_microphone`:
    audio_config = speechsdk.audio.AudioConfig(filename=src)
    # audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
    speech_recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config, audio_config=audio_config)

    done = False
    transcript = []

    def stop_cb(evt):
        """callback that signals to stop continuous recognition upon receiving an event `evt`"""
        print('CLOSING on {}'.format(evt))
        nonlocal done
        done = True

    def get_recognized(evt):
        try:
            predicted_text = evt.result.text
            nonlocal transcript
            transcript.append(predicted_text)
        except Exception as err:
            print("Error: ",err)

    # Connect callbacks to the events fired by the speech recognizer
    # speech_recognizer.recognizing.connect(get_recognized)
    speech_recognizer.recognized.connect(get_recognized)
    speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
    speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
    speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))
    # stop continuous recognition on either session stopped or canceled events
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    # Start continuous speech recognition
    speech_recognizer.start_continuous_recognition()
    while not done:
        time.sleep(.5)
    else:
        speech_recognizer.stop_continuous_recognition()
        
        return ' '.join(transcript)


def download(url, path):
    yt = pytube.YouTube(url)
    bestaudio = yt.streams.filter(only_audio=True).first()
    bestaudio.download(path, filename='temp.mp3')


def mp3towav(src):
    try:
        # convert mp3 to wav file
        os.chdir(FFMPEG_PATH)
        subprocess.call(['ffmpeg', '-y', '-i', src, '-acodec', 'pcm_u8', '-ar', '24000',
                         DESTINATION_WAV_PATH])
    except Exception as e:
        print(e)


# def transcribe(path):
#     r = sr.Recognizer()
#     with sr.AudioFile(path) as source:
#         audio_text = r.record(source)
#         text = r.recognize_google(audio_text)
#         print(text)
#         print('Converting audio transcripts into text ...')
#         return text
