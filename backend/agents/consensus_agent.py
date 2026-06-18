from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_consensus(sources):

    contents = [
        s["content"]
        for s in sources
    ]

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(contents)

    similarity = cosine_similarity(vectors)

    score = similarity.mean() * 100

    return {
        "consensus_score": round(score,2),
        "agreement_level": "High" if score > 80 else "Moderate"
    }