import json
from flask import Blueprint
from flask import Response, request, render_template, redirect, url_for, jsonify
from model import nlp_model, get_summary

views = Blueprint(__name__, "views")


@views.route('/summarizevideo', methods=['GET'])
def summarize_video():
    # Retrieve the video_id from url parameter
    vid_url = request.args.get("video_url", None)

    if "youtube.com" in vid_url:

        try:
            video_id = vid_url.split("=")[1]

            try:
                video_id = video_id.split("&")[0]

            except:
                video_id = "False"

        except:
            video_id = "False"

    elif "youtu.be" in vid_url:

        try:
            video_id = vid_url.split("/")[3]

        except:

            video_id = "False"

    else:
        video_id = "False"

    # For debugging
    # print(f"got name {video_id}")

    body = {}
    data = {}

    # Check if user doesn't provided  at all
    if not video_id:
        data['message'] = "Failed"
        data['error'] = "no video id found, please provide valid video id."

    # Check if the user entered a invalid inside video_id
    elif str(video_id) == "False":
        data['message'] = "Failed"
        data['error'] = "video id invalid, please provide valid video id."

    # Now the user has given a valid video id
    else:
        result = nlp_model(video_id)
        if result == "0":
            data['message'] = "Failed"
            data['error'] = "API's not able to retrive Video Transcript."

        else:
            data['message'] = "Success"
            data['id'] = video_id
            data['original_txt_length'], data['final_summ_length'], data['eng_summary'], data['hind_summary'], data['guj_summary'] = result

    body["data"] = data

    # Return the response in json format
    return buildResponse(body)


@views.route('/summarizetext', methods=['POST'])
def summarize_text():
    # Retrieve the text from body
    json_body = json.loads(request.data.decode())
    text_inp = json_body.get('text')
#     text_inp = '''
#     Miss Brill' is the story of an old woman told brilliantly and realistically, balancing thoughts and emotions that sustain her late solitary life amidst all the bustle of modern life. Miss Brill is a regular visitor on Sundays to the Jardins Publiques (the Public Gardens) of a small French suburb where she sits and watches all sorts of people come and go. She listens to the band playing, loves to watch people and guess what keeps them going, and enjoys contemplating the world as a great stage upon which actors perform. She finds herself to be another actor among the so many she sees, or at least herself as 'part of the performance after all.' One Sunday Miss Brill puts on her fur and goes to the Public Gardens as usual. The evening ends with her sudden realization that she is old and lonely, a realization brought to her by a conversation she overhears between a boy and a girl, presumably lovers, who comment on her unwelcome presence in their vicinity.
# Miss Brill is sad and depressed as she returns home, not stopping by as usual to buy her Sunday delicacy, a slice of honey-cake. She retires to her dark room, puts the fur back into the box and imagines that she has heard something cry.
#     '''
    body, data = {}, {}
    result = get_summary(text_inp, 0)
    if result == "0":
        data['message'] = "Failed"
        data['error'] = "API's not able to retrive Video Transcript."

    else:
        data['message'] = "Success"
        data['original_txt_length'], data['final_summ_length'], data['eng_summary'], data['hind_summary'], data['guj_summary'] = result

    body["data"] = data

    # Return the response in json format
    return buildResponse(body)


# Welcome message to our server
@views.route('/')
def index():

    body = {}
    body['message'] = "Success"
    body['data'] = "Welcome to YTS API."

    return buildResponse(body)


def buildResponse(body):
    response = jsonify(body)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response
