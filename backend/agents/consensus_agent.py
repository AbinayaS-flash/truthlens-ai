from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def calculate_consensus(sources):

    contents = [
        source["content"]
        for source in sources
    ]

    similarities = []

    for i in range(len(contents)):
        for j in range(i + 1, len(contents)):

            emb1 = model.encode(
                contents[i]
            )

            emb2 = model.encode(
                contents[j]
            )

            similarity = util.cos_sim(
                emb1,
                emb2
            )

            similarities.append(
                similarity.item()
            )

    average_similarity = (
        sum(similarities) / len(similarities)
    )

    consensus_score = round(
        average_similarity * 100,
        2
    )

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