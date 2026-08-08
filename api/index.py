from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "TruthLens AI running"
    }


@app.get("/truthlens")
def truthlens(query: str):
    try:
        # Load the graph only when the endpoint is called
        from backend.graph.workflow import graph

        result = graph.invoke(
            {
                "query": query
            }
        )

        return result

    except Exception as e:
        return {
            "error": str(e)
        }