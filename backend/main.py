from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.workflow import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://truthlens-9n46wyz70-supernova-projects1.vercel.app",
        "https://truthlens-ai-omega.vercel.app"
    ],
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
    try:
        return graph.invoke({"query": query})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "error": str(e)
        }

    return result