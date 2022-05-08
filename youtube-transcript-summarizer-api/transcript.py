from itertools import tee
import os
from youtube_transcript_api import YouTubeTranscriptApi
from audiototext import download, mp3towav, DESTINATION_WAV_PATH, recognize_from_file

def get_transcript_of_yt_video(v_id):

    try:

        transcript_list = YouTubeTranscriptApi.list_transcripts(v_id)
        l = len(list(transcript_list))

        if (l > 1):
            try:
                final_transcript = YouTubeTranscriptApi.get_transcript(
                    v_id, languages=['en'])
                return final_transcript
            except:
                for i in transcript_list:
                    start_with = str(i)[:2]
                    transcript = transcript_list.find_transcript([start_with])
                    final_transcript = transcript.translate('en').fetch()
                    return final_transcript
        else:
            for i in transcript_list:
                start_with = str(i)[:2]
                if start_with == 'en':
                    final_transcript = YouTubeTranscriptApi.get_transcript(
                        v_id, languages=['en'])
                else:
                    transcript = transcript_list.find_transcript([start_with])
                    final_transcript = transcript.translate('en').fetch()
                return final_transcript

    except:
        tempaudiopath = 'C:\\Projects\\videosummrx\\youtube-transcript-summarizer-api\\tempaudios'
        try:
            download(f'https://www.youtube.com/watch?v={v_id}',tempaudiopath)
        except Exception as err:
            print("Error: ",err)
        mp3towav('C:\\Projects\\videosummrx\\youtube-transcript-summarizer-api\\tempaudios\\temp.mp3')

        final_transcript = recognize_from_file(DESTINATION_WAV_PATH)
        return final_transcript
