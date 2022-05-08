import re
import nltk
import spacy
from string import punctuation
from transcript import get_transcript_of_yt_video
from translate import g_translate
from heapq import nlargest
from nltk.corpus import stopwords
nltk.download('stopwords')


def text_summarizer(text):

    nlp = spacy.load('en_core_web_sm')
    stop_words = stopwords.words('english')
    doc = nlp(text)
    # tokens=[token.text for token in doc]

    word_frequencies = {}
    for word in doc:
        word_text = word.text.lower()
        if word_text not in (stop_words+list(punctuation)):
            word_frequencies[word_text] = word_frequencies.get(word_text, 0)+1

    max_frequency = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = word_frequencies[word]/max_frequency

    sentence_tokens = [sent for sent in doc.sents]

    sentence_scores = {}
    for sent in sentence_tokens:
        for word in sent:
            word_text = word.text.lower()
            if word_text in word_frequencies.keys():
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word_text]
                else:
                    sentence_scores[sent] += word_frequencies[word_text]

    select_length = int(len(sentence_tokens)*0.3)
    summary = nlargest(select_length, sentence_scores, key=sentence_scores.get)

    summary = [re.sub('[.]', '', (word.text).replace(
        "\n", ",").strip()).capitalize() for word in summary]
    final_text = '. '.join(summary)

    final_summary = re.sub(',,|,\.|,\-|[\"]', '', final_text)

    return final_summary


def get_summary(transcript, mode=1):
    # mode 1 - transcript will be in a list format
    # mode 0 - transcript is in string format
    original_text = transcript if not mode else ' '.join(
        [t['text'] for t in transcript])
    original_text_length = len(original_text)
    english_summary = text_summarizer(original_text)
    if english_summary:
        final_summary_length = len(english_summary)
        hindi_translated_summary = g_translate(english_summary, 'hi')
        gujarati_translated_summary = g_translate(english_summary, 'gu')
    else:
        final_summary_length = len(original_text)
        hindi_translated_summary = g_translate(original_text, 'hi')
        gujarati_translated_summary = g_translate(original_text, 'gu')
        english_summary = original_text

    return original_text_length, final_summary_length, english_summary, hindi_translated_summary, gujarati_translated_summary


def nlp_model(v_id):

    transcript = get_transcript_of_yt_video(v_id)

    if (transcript == '0'):
        return '0'
    else:
        return get_summary(transcript) if isinstance(transcript, list) else get_summary(transcript, 0)
