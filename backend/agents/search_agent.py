from tavily import TavilyClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create Tavily client
client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)

def search_sources(query):

    response = client.search(
        query=query,
        max_results=5
    )

    return response["results"]