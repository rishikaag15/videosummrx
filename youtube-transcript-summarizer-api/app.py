"""
Project Name: Video Summarizer
YouTube Transcript Summarizer API
"""


from flask import Flask
from flask_cors import CORS
from views import views


app = Flask(__name__)
app.register_blueprint(views, url_prefix="/api/v1")
CORS(app)


if __name__ == '__main__':

    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, debug=True)

# Deployment to Heroku Cloud.
