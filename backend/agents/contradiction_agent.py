from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def detect_contradiction(sources):

    # ---------------------------------------
    # No sources
    # ---------------------------------------
    if not sources:
        return "No sources available"

    # ---------------------------------------
    # Collect source contents
    # ---------------------------------------
    contents = []

    for source in sources:
        content = source.get("content", "")

        if content:
            contents.append(content)

    if not contents:
        return "No sources available"

    source_text = "\n\n--- SOURCE ---\n\n".join(contents)

    # ---------------------------------------
    # Prompt
    # ---------------------------------------
    prompt = f"""
Analyze the following sources and determine whether they agree
or contradict each other.

Sources:
{source_text}

Return ONLY valid JSON.

IMPORTANT:
- Do NOT use Markdown code fences.
- Do NOT write ```json.
- Do NOT add explanations outside the JSON.
- The response must start with {{ and end with }}.

Required format:

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

        # ---------------------------------------
        # Call Groq
        # ---------------------------------------
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

        # ---------------------------------------
        # Get raw response
        # ---------------------------------------
        content = response.choices[0].message.content.strip()

        print("Contradiction agent response:")
        print(content)

        # ---------------------------------------
        # Remove Markdown code fences
        # ---------------------------------------
        if content.startswith("```"):

            content = content.replace(
                "```json",
                "",
                1
            )

            content = content.replace(
                "```",
                "",
                1
            )

            content = content.strip()

        # ---------------------------------------
        # Parse JSON
        # ---------------------------------------
        try:

            result = json.loads(content)

            status = result.get(
                "status",
                "Unable to determine agreement"
            )

            return status

        except json.JSONDecodeError as e:

            print("Invalid JSON returned by Groq")
            print("Raw response:")
            print(content)
            print("JSON error:")
            print(e)

            # ---------------------------------------
            # Fallback
            # ---------------------------------------
            text = content.lower()

            if "possible contradictions detected" in text:
                return "Possible contradictions detected"

            if "moderate agreement" in text:
                return "Moderate agreement"

            if "high agreement" in text:
                return "High agreement"

            return "Unable to determine agreement"

    except Exception as e:

        print("Contradiction detection error:")
        print(e)

        return "Unable to determine agreement"