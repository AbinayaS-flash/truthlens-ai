def detect_hallucination(answer, sources):

    source_text = ""

    for source in sources:
        source_text += source["content"].lower()

    answer = answer.lower()

    words = answer.split()

    matched_words = 0

    for word in words:

        if word in source_text:
            matched_words += 1

    similarity = matched_words / len(words)

    if similarity > 0.7:
        return "No hallucination detected"

    elif similarity > 0.5:
        return "Low risk of hallucination"

    else:
        return "Possible hallucination detected"