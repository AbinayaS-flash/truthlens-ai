from sentence_transformers import util
from backend.agents.model_loader import get_model


def detect_contradiction(sources):

    contents = []

    for source in sources:
        contents.append(
            source["content"]
        )

    similarities = []

    # Load the model only when this function is actually called
    model = get_model()

    for i in range(len(contents)):

        for j in range(i + 1, len(contents)):

            similarity = util.cos_sim(
                model.encode(contents[i]),
                model.encode(contents[j])
            )

            similarities.append(
                similarity.item()
            )

    # Handle cases where there are fewer than 2 sources
    if not similarities:
        return "Not enough sources to determine agreement"

    average_similarity = sum(similarities) / len(similarities)

    if average_similarity > 0.8:
        return "High agreement"

    elif average_similarity > 0.6:
        return "Moderate agreement"

    else:
        return "Possible contradictions detected"