import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  const pipelineSteps = [
    "Searching Trusted Sources",
    "Ranking Sources",
    "Fact Verification",
    "Bias Detection",
    "Confidence Calculation",
    "Generating Final Answer",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

 async function searchTruth() {
  if (!query.trim()) return;

  try {
    setLoading(true);
    setResult(null);

    // Reset pipeline
    setCurrentStep(0);

    // Pipeline Animation
    for (let i = 0; i < 4; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 300));
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/truthlens`,
      {
        params: { query },
      }
    );

    setCurrentStep(4);
    await new Promise((r) => setTimeout(r, 300));
    setCurrentStep(5);

    setResult(response.data);

    // ==========================
    // Save Recent Searches
    // ==========================
    setHistory((prev) => {
      const updated = [
        query,
        ...prev.filter(
          (item) => item.toLowerCase() !== query.toLowerCase()
        ),
      ];

      return updated.slice(0, 6); // Keep only last 6 searches
    });

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
  const verdict =
    result?.confidence >= 80
      ? { icon: "✅", text: "LIKELY TRUE", color: "text-green-400" }
      : result?.confidence >= 50
      ? { icon: "⚠️", text: "PARTIALLY VERIFIED", color: "text-yellow-400" }
      : { icon: "❌", text: "LOW CONFIDENCE", color: "text-red-400" };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <div className="w-full bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-cyan-400">TruthLens AI</h1>
          <div className="flex items-center gap-4">
            <span>{userEmail || "User"}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 px-4">
        <div className="w-full max-w-3xl bg-gray-900/70 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl text-center mb-6">Ask anything. We verify truth.</h2>

          <div className="flex gap-3">
            <input
              className="flex-1 p-4 rounded-xl bg-gray-800 border border-gray-700"
              placeholder="Ask your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchTruth()}
            />
            <button onClick={searchTruth} className="bg-cyan-500 hover:bg-cyan-600 px-8 rounded-xl">
              Search
            </button>
          </div>

          {loading && (
            <div className="mt-8 bg-gray-950 rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl text-cyan-400 mb-4">AI Verification Pipeline</h3>
              {pipelineSteps.map((item, index) => (
                <div key={index} className="flex justify-between py-2">
                  <span>{item}</span>
                  {currentStep > index ? (
                    <span className="text-green-400">✓</span>
                  ) : currentStep === index ? (
                    <span className="text-yellow-400">Processing...</span>
                  ) : (
                    <span className="text-gray-500">Waiting</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {result && (
          <>
            <div className="w-full max-w-3xl mt-8 bg-gray-900/70 rounded-2xl p-6 border border-gray-800">
              <div className="text-center mb-6">
                <div className="text-6xl">{verdict.icon}</div>
                <h2 className={`text-3xl font-bold ${verdict.color}`}>{verdict.text}</h2>
              </div>

              <h3 className="text-xl text-green-400 mb-3">Answer</h3>
              <p className="leading-8">{result.answer}</p>
              {/* ================= AI SUMMARY ================= */}
              <div className="mt-8 space-y-6">
                {/* Confidence */}
                <div className="bg-gray-800 rounded-xl p-5">
                  <div className="flex justify-between mb-3">
                    <span className="text-lg">
                      🎯 Confidence
                    </span>
                    <span className="font-bold text-green-400">
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-700"
                      style={{
                        width: `${result.confidence}%`
                     }}
                    />
                  </div>
                </div>
                {/* Fact Check */}
                <div className="bg-gray-800 rounded-xl p-5 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-cyan-400">
                      ✔ Fact Check
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {result.fact_check_status}
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-green-400">
                    {result.fact_check_score}
                  </div>
                </div>
                {/* Bias */}
                <div className="bg-gray-800 rounded-xl p-5 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-yellow-400">
                      ⚖ Bias
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Sentiment Analysis
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {result.bias}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= TRUSTED SOURCES ================= */}
            {result.results?.length > 0 && (
            <div className="mt-10">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            🌐 Trusted Sources
            </h2>
            <div className="space-y-5">
            {result.results.map((item,index)=>{
            const trust=Math.round(item.score*100);
            return(
            <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300"
            >
            <div className="flex justify-between items-start">
            <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">
            {item.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 break-all">
            {item.url}
            </p>
            <div className="mt-5">
            <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-300">
            Trust Score
            </span>
            <span className="font-bold text-green-400">
            {trust}%
            </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
            <div
            className="bg-green-500 h-3 rounded-full"
            style={{
            width:`${trust}%`
            }}
            ></div>
            </div>
            </div>
            </div>
            <div className="ml-6 text-right">
            <div className="text-green-400 font-bold">
            {trust>=90
            ?"Highly Trusted"
            :trust>=75
            ?"Trusted"
            :"Medium Trust"}
            </div>
            <div className="text-cyan-400 mt-6">
            Open →
            </div>
            </div>
            </div>
            </a>
            );
            })}
            </div>
            </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
