from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot.healthcare_bot import get_bot_response

app = Flask(__name__)
CORS(app)  # allows frontend to connect

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    
    bot_reply = get_bot_response(user_message)
    
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
