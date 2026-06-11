from typing import TypedDict


class TruthLensState(TypedDict):

    query: str

    results: list

    verified: list

    answer: str

    hallucination_check: str

    contradiction_check: str

    consensus_score: float

    agreement_level: str

    fact_check_score: float

    fact_check_status: str

    bias: str

    confidence: int

    explanation: str