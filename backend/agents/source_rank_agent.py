def rank_source(url):

    if "who.int" in url:
        return 5

    elif "harvard.edu" in url:
        return 5

    elif "nih.gov" in url:
        return 5

    elif "pubmed.ncbi.nlm.nih.gov" in url:
        return 5

    elif "wikipedia.org" in url:
        return 4

    elif "youtube.com" in url:
        return 3

    else:
        return 2