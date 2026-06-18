def calculate_consensus(sources):

    trust_scores = []

    for source in sources:
        trust_scores.append(source["trust_score"])

    average = sum(trust_scores) / len(trust_scores)

    consensus_score = round((average / 5) * 100, 2)

    if consensus_score >= 80:
        agreement = "High"

    elif consensus_score >= 60:
        agreement = "Moderate"

    else:
        agreement = "Low"

    return {
        "consensus_score": consensus_score,
        "agreement_level": agreement
    }