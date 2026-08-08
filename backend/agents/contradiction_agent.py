from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def detect_contradiction(sources):

    if not sources:
        return "No sources available"

    contents = []

    for source in sources:
        contents.append(source["content"])

    source_text = "\n\n--- SOURCE ---\n\n".join(contents)

    prompt = f"""
Analyze the following sources and determine whether they agree or contradict each other.

Sources:
{source_text}

Return ONLY valid JSON:

{{
    "status": "High agreement",
    "reason": "short explanation"
}}

Possible status values:

- High agreement
- Moderate agreement
- Possible contradictions detected
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

        content = response.choices[0].message.content.strip()

        print("Contradiction agent response:")
        print(content)

        try:

            result = json.loads(content)

            return result.get(
                "status",
                "Unable to determine agreement"
            )

        except json.JSONDecodeError:

            print("Invalid JSON returned by Groq")

            text = content.lower()

            if "high agreement" in text:
                return "High agreement"

            elif "moderate agreement" in text:
                return "Moderate agreement"

            elif "possible contradictions" in text:
                return "Possible contradictions detected"

            return "Unable to determine agreement"

    except Exception as e:

        print("Contradiction detection error:", e)

        return "Unable to determine agreement"