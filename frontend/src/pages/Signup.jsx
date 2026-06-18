import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <div className="w-96 bg-gray-900 p-6 rounded-2xl border border-gray-800">

        <h1 className="text-2xl text-center mb-5 text-cyan-400">
          Sign Up
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* EMAIL INPUT */}
        <input
          className="w-full p-3 mb-3 rounded-xl bg-gray-800 text-white border border-gray-600"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD INPUT */}
        <input
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white border border-gray-600"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl font-semibold"
        >
          Create Account
        </button>

        {/* LINK */}
        <p className="text-center text-sm mt-4 text-gray-400">
          Already have account?{" "}
          <Link to="/login" className="text-cyan-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;