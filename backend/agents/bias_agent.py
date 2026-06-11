from textblob import TextBlob

def detect_bias(text):

    polarity = TextBlob(text).sentiment.polarity

    if polarity > 0.5:
        return "Positive Bias"

    elif polarity < -0.5:
        return "Negative Bias"

    else:
        return "Low Bias"