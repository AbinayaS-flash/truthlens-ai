from difflib import SequenceMatcher


def fact_check(answer, sources):

    source_text = ""

    for source in sources:
        source_text += source["content"] + " "


    similarity = SequenceMatcher(
        None,
        answer,
        source_text
    ).ratio()


    score = round(
        similarity * 100,
        2
    )


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