from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.workflow import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "TruthLens AI is running"
    }


@app.get("/truthlens")
def truthlens(query: str):

    result = graph.invoke(
        {
            "query": query
        }
    )

    return result