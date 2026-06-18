
import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          setUserEmail(
            user.email
          );

        }

      }
    );

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

      setStep("Searching sources...");

      console.log(
        "API URL =",
        import.meta.env.VITE_API_URL
      );

      const response = await axios.get(
        "https://truthlens-ai-4.onrender.com/truthlens",
        {
          params: { query }
        }
      );

      console.log(
        "Response =",
        response.data
      );

      setStep("Analyzing...");

      setResult(
        response.data
      );

      setStep("Completed");

    }

    catch (err) {

      console.log(
        "FULL ERROR =",
        err
      );

      if (err.response) {

        console.log(
          err.response.data
        );

        alert(

          JSON.stringify(

            err.response.data,

            null,

            2

          )

        );

      }

      else {

        alert(

          err.message

        );

      }

      setStep(

        "Error occurred"

      );

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">

      {/* NAVBAR */}

      <div className="w-full bg-gray-900 border-b border-gray-800 shadow-lg">

        <div className="flex justify-between items-center px-6 py-4">

          <h1 className="text-3xl font-bold text-cyan-400">

            TruthLens AI

          </h1>

          <div className="flex items-center gap-4">

            <span className="text-white font-medium">

              {userEmail || "User"}

            </span>

            <button

              onClick={handleLogout}

              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition"

            >

              Logout

            </button>

          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="flex flex-col items-center mt-20 px-4">

        <div className="w-full max-w-2xl bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl">

          <h2 className="text-xl font-semibold text-center text-gray-200 mb-4">

            Ask anything. We verify truth.

          </h2>

          <div className="flex gap-3">

            <input

              className="flex-1 p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 outline-none"

              placeholder="Ask your question..."

              value={query}

              onChange={(e) =>

                setQuery(e.target.value)

              }

            />

            <button

              onClick={searchTruth}

              className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-xl font-semibold transition"

            >

              Search

            </button>

          </div>

          {step && (

            <p className="text-center mt-4 text-cyan-300">

              {step}

            </p>

          )}

          {loading && (

            <div className="text-center mt-3 text-gray-400">

              Loading...

            </div>

          )}

        </div>

        {/* RESULT */}

        {result && (

          <div className="w-full max-w-2xl mt-8 bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl">

            <h2 className="text-lg font-bold text-green-400">

              Answer

            </h2>

            <p className="text-gray-300 mt-3 leading-relaxed">

              {result.answer}

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Home;

