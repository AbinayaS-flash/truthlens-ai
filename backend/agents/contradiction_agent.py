from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def detect_contradiction(sources):

    contents = []

    for source in sources:
        contents.append(
            source["content"]
        )

    similarities = []

    for i in range(len(contents)):
        for j in range(i + 1, len(contents)):

            similarity = util.cos_sim(
                model.encode(contents[i]),
                model.encode(contents[j])
            )

            similarities.append(
                similarity.item()
            )

    average_similarity = sum(similarities) / len(similarities)

    if average_similarity > 0.8:
        return "High agreement"

    elif average_similarity > 0.6:
        return "Moderate agreement"

    else:
        return "Possible contradictions detected"