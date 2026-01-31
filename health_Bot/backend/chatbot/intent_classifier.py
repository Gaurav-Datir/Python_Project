from chatbot.symptoms_data import HEALTH_DATA

def detect_intent(user_message):
    for disease in HEALTH_DATA:
        if disease in user_message:
            return disease
    return None
