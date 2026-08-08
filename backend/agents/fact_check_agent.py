from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def fact_check(answer, sources):

    if not sources:

        return {
            "fact_check_score": 0,
            "fact_check_status": "Unsupported claim detected"
        }

    source_text = ""

    for source in sources:
        source_text += source["content"] + "\n\n"

    prompt = f"""
You are a fact-checking system.

Compare the answer against the provided sources.

Answer:
{answer}

Sources:
{source_text}

Evaluate how well the answer is supported by the sources.

Return ONLY valid JSON:

{{
    "fact_check_score": 85,
    "fact_check_status": "Verified"
}}

Rules:

80-100:
Verified

60-79:
Partially Supported

0-59:
Unsupported claim detected

The score must be an integer between 0 and 100.
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        result = json.loads(
            response.choices[0].message.content
        )

        return {
            "fact_check_score": result["fact_check_score"],
            "fact_check_status": result["fact_check_status"]
        }

    except Exception as e:

        print("Fact check error:", e)

        return {
            "fact_check_score": 0,
            "fact_check_status": "Unable to verify"
        }