from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def detect_contradiction(sources):

    contents = []

    for source in sources:
        contents.append(
            source["content"]
        )


    if len(contents) < 2:
        return "Not enough sources to compare"


    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(
        contents
    )


    similarity_matrix = cosine_similarity(
        vectors
    )


    similarities = []


    for i in range(len(contents)):
        for j in range(i + 1, len(contents)):

            similarities.append(
                similarity_matrix[i][j]
            )


    average_similarity = sum(similarities) / len(similarities)


    if average_similarity > 0.8:
        return "High agreement"

    elif average_similarity > 0.6:
        return "Moderate agreement"

    else:
        return "Possible contradictions detected"