from chatbot.symptoms_data import HEALTH_DATA
from chatbot.intent_classifier import detect_intent
from chatbot.utils import clean_text

def get_bot_response(user_message):
    message = clean_text(user_message)
    intent = detect_intent(message)

    if intent:
        data = HEALTH_DATA[intent]
        return (
            f"🩺 **{intent.capitalize()}**\n\n"
            f"📌 Description: {data['description']}\n"
            f"🤒 Symptoms: {', '.join(data['symptoms'])}\n"
            f"💊 Care: {data['care']}\n"
            f"⚠️ Warning: {data['warning']}"
        )

    return (
        "🤖 I can help with common health issues like:\n"
        "• Fever\n• Headache\n• Cough\n\n"
        "Please type a symptom name."
    )
