from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def fact_check(answer, sources):

    source_text = ""

    for source in sources:
        source_text += source["content"] + " "


    if not source_text.strip():
        return {
            "fact_check_score": 0,
            "fact_check_status": "No sources available"
        }


    vectorizer = TfidfVectorizer()


    vectors = vectorizer.fit_transform(
        [
            answer,
            source_text
        ]
    )


    similarity = cosine_similarity(
        vectors[0:1],
        vectors[1:2]
    )[0][0]


    similarity = round(
        similarity * 100,
        2
    )


    if similarity >= 80:

        status = "Verified"

    elif similarity >= 60:

        status = "Partially Supported"

    else:

        status = "Unsupported claim detected"


    return {
        "fact_check_score": similarity,
        "fact_check_status": status
    }