from difflib import SequenceMatcher


def detect_contradiction(sources):

    contents = []

    for source in sources:
        contents.append(
            source["content"]
        )


    if len(contents) < 2:
        return "Not enough sources to compare"


    similarities = []


    for i in range(len(contents)):
        for j in range(i + 1, len(contents)):

            score = SequenceMatcher(
                None,
                contents[i],
                contents[j]
            ).ratio()

            similarities.append(score)


    average_similarity = sum(similarities) / len(similarities)


    if average_similarity > 0.8:
        return "High agreement"

    elif average_similarity > 0.6:
        return "Moderate agreement"

    else:
        return "Possible contradictions detected"