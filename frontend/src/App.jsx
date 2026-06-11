import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");

  async function searchTruth() {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      // Step 1
      setStep("🔍 Searching sources...");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/truthlens`,
        {
          params: { query },
        }
      );

      // Step 2
      setStep("🧠 Verifying information...");
      await new Promise((r) => setTimeout(r, 500));

      // Step 3
      setStep("⚖️ Detecting bias...");
      await new Promise((r) => setTimeout(r, 500));

      // Final
      setResult(response.data);
      setStep("✅ Analysis complete");
    } catch (error) {
      console.log(error);
      setStep("❌ Error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4">

      {/* HEADER */}
      <h1 className="text-5xl font-bold mt-10 text-center">
        TruthLens AI
      </h1>

      <p className="text-gray-400 mt-2 text-center">
        Ask anything. We verify truth from multiple sources.
      </p>

      {/* SEARCH BOX CARD */}
      <div className="mt-10 w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">

        <div className="flex gap-3">
          <input
            className="flex-1 p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchTruth();
            }}
          />

          <button
            className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700 transition"
            onClick={searchTruth}
          >
            Search
          </button>
        </div>

        {/* STEP INDICATOR */}
        {step && (
          <p className="text-center mt-4 text-blue-400 animate-pulse">
            {step}
          </p>
        )}

        {/* LOADING BAR */}
        {loading && (
          <div className="mt-4 w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="h-2 bg-blue-500 animate-pulse w-full"></div>
          </div>
        )}
      </div>

      {/* RESULT CARD */}
      {result && !loading && (
        <div className="mt-10 w-full max-w-2xl bg-gray-900 p-6 rounded-2xl border border-gray-800">

          {/* Answer */}
          <h2 className="text-xl font-bold text-white">Answer</h2>
          <p className="text-gray-300 mt-2 leading-relaxed">
            {result.answer}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 text-center">

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-green-400 font-bold">
                {result.confidence}%
              </p>
              <p className="text-xs text-gray-400">Confidence</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-yellow-300 font-bold">
                {result.bias}
              </p>
              <p className="text-xs text-gray-400">Bias</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-blue-400 font-bold">
                {result.fact_check_score}
              </p>
              <p className="text-xs text-gray-400">Fact Score</p>
            </div>

          </div>

          {/* Explanation */}
          {result.explanation && (
            <div className="mt-6">
              <h2 className="text-lg font-bold">Explanation</h2>
              <p className="text-gray-400 mt-2 leading-relaxed">
                {result.explanation}
              </p>
            </div>
          )}

          {/* Sources */}
          {result.results && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-3">Sources</h2>

              <div className="space-y-3">
                {result.results.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    <p className="text-blue-400 font-medium">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      Score: {r.score}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;