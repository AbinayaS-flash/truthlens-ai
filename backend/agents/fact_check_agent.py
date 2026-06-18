def fact_check(answer, sources):

    trust_scores = []

    for source in sources:
        trust_scores.append(source["trust_score"])

    average = sum(trust_scores) / len(trust_scores)

    score = round((average / 5) * 100, 2)

    if score >= 80:
        status = "Verified"

    elif score >= 60:
        status = "Partially Supported"

    else:
        status = "Unsupported claim detected"

    return {
        "fact_check_score": score,
        "fact_check_status": status
    }