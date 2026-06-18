def detect_contradiction(sources):

    trust_scores = []

    for source in sources:
        trust_scores.append(source["trust_score"])

    average = sum(trust_scores) / len(trust_scores)

    if average >= 4:
        return "High agreement"

    elif average >= 3:
        return "Moderate agreement"

    else:
        return "Possible contradictions detected"