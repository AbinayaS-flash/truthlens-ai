from agents.search_agent import search_sources
from agents.verify_agent import verify_sources
from agents.bias_agent import detect_bias
from agents.confidence_agent import calculate_confidence
from agents.explanation_agent import explain

query = "Is coffee harmful?"

results = search_sources(query)

verified = verify_sources(results)

combined_text = ""

for item in verified:
    combined_text += item["content"]

bias = detect_bias(combined_text)

confidence = calculate_confidence(verified)

explanation = explain(confidence, bias)

print("\nBias:", bias)
print("\nConfidence:", confidence)
print("\nExplanation:")
print(explanation)