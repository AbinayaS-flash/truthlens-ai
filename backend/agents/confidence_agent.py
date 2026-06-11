def calculate_confidence(sources):

    total_sources = len(sources)

    if total_sources >= 5:
        return 95

    elif total_sources >= 3:
        return 85

    else:
        return 65