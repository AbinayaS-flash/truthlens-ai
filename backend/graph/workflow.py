from langgraph.graph import StateGraph, END

from graph.state import TruthLensState

from agents.search_agent import search_sources
from agents.verify_agent import verify_sources
from agents.answer_agent import generate_answer
from agents.hallucination_agent import detect_hallucination
from agents.contradiction_agent import detect_contradiction
from agents.consensus_agent import calculate_consensus
from agents.fact_check_agent import fact_check
from agents.bias_agent import detect_bias
from agents.confidence_agent import calculate_confidence
from agents.explanation_agent import explain


def search_node(state):

    results = search_sources(
        state["query"]
    )

    return {
        "results": results
    }


def verify_node(state):

    verified = verify_sources(
        state["results"]
    )

    return {
        "verified": verified
    }


def answer_node(state):

    answer = generate_answer(
        state["query"],
        state["verified"]
    )

    return {
        "answer": answer
    }


def hallucination_node(state):

    hallucination = detect_hallucination(
        state["answer"],
        state["verified"]
    )

    return {
        "hallucination_check": hallucination
    }


def contradiction_node(state):

    contradiction = detect_contradiction(
        state["verified"]
    )

    return {
        "contradiction_check": contradiction
    }


def consensus_node(state):

    consensus = calculate_consensus(
        state["verified"]
    )

    return {
        "consensus_score": consensus["consensus_score"],
        "agreement_level": consensus["agreement_level"]
    }


def fact_check_node(state):

    result = fact_check(
        state["answer"],
        state["verified"]
    )

    return {
        "fact_check_score": result["fact_check_score"],
        "fact_check_status": result["fact_check_status"]
    }


def bias_node(state):

    combined_text = ""

    for source in state["verified"]:
        combined_text += source["content"] + " "

    bias = detect_bias(
        combined_text
    )

    return {
        "bias": bias
    }


def confidence_node(state):

    confidence = calculate_confidence(
        state["verified"]
    )

    return {
        "confidence": confidence
    }


def explanation_node(state):

    explanation = explain(
        state["confidence"],
        state["bias"]
    )

    return {
        "explanation": explanation
    }


# ---------------- GRAPH ---------------- #

builder = StateGraph(
    TruthLensState
)

builder.add_node(
    "search_node",
    search_node
)

builder.add_node(
    "verify_node",
    verify_node
)

builder.add_node(
    "answer_node",
    answer_node
)

builder.add_node(
    "hallucination_node",
    hallucination_node
)

builder.add_node(
    "contradiction_node",
    contradiction_node
)

builder.add_node(
    "consensus_node",
    consensus_node
)

builder.add_node(
    "fact_check_node",
    fact_check_node
)

builder.add_node(
    "bias_node",
    bias_node
)

builder.add_node(
    "confidence_node",
    confidence_node
)

builder.add_node(
    "explanation_node",
    explanation_node
)


builder.set_entry_point(
    "search_node"
)


builder.add_edge(
    "search_node",
    "verify_node"
)

builder.add_edge(
    "verify_node",
    "answer_node"
)

builder.add_edge(
    "answer_node",
    "hallucination_node"
)

builder.add_edge(
    "hallucination_node",
    "contradiction_node"
)

builder.add_edge(
    "contradiction_node",
    "consensus_node"
)

builder.add_edge(
    "consensus_node",
    "fact_check_node"
)

builder.add_edge(
    "fact_check_node",
    "bias_node"
)

builder.add_edge(
    "bias_node",
    "confidence_node"
)

builder.add_edge(
    "confidence_node",
    "explanation_node"
)

builder.add_edge(
    "explanation_node",
    END
)


graph = builder.compile()