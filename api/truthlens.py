from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.graph.workflow import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def truthlens(query: str):
    try:
        result = graph.invoke({
            "query": query
        })

        return result

    except Exception as e:
        import traceback
        traceback.print_exc()

        return {
            "error": str(e)
        }