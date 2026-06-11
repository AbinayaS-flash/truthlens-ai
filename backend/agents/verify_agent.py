from agents.source_rank_agent import rank_source


def verify_sources(results):

    verified_sources = []

    for source in results:

        trust_score = rank_source(
            source["url"]
        )

        verified_sources.append(
            {
                "title": source["title"],
                "content": source["content"],
                "url": source["url"],
                "trust_score": trust_score
            }
        )

    return verified_sources