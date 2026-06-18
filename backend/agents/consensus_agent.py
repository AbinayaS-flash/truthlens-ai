from difflib import SequenceMatcher


def calculate_consensus(sources):

    contents = [
        source["content"]
        for source in sources
    ]


    similarities = []


    for i in range(len(contents)):
        for j in range(i + 1, len(contents)):

            score = SequenceMatcher(
                None,
                contents[i],
                contents[j]
            ).ratio()

            similarities.append(score)


    if not similarities:
        return {
            "consensus_score": 0,
            "agreement_level": "Low"
        }


    avg = sum(similarities) / len(similarities)


    consensus_score = round(
        avg * 100,
        2
    )


    if consensus_score >= 80:
        level = "High"

    elif consensus_score >= 60:
        level = "Moderate"

    else:
        level = "Low"


    return {
        "consensus_score": consensus_score,
        "agreement_level": level
    }