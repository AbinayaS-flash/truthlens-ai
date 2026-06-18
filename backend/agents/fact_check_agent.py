from sentence_transformers import util
from agents.model_loader import model

def fact_check(answer, sources):

    source_text = ""

    for source in sources:
        source_text += source["content"] + " "

    answer_embedding = model.encode(
        answer,
        convert_to_tensor=True
    )

    source_embedding = model.encode(
        source_text,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        answer_embedding,
        source_embedding
    ).item()

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