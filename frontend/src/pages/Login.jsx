import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">

      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">

        <h1 className="text-2xl text-center text-cyan-400 mb-6">
          Login
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-cyan-400 outline-none"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-cyan-400 outline-none"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-xl font-semibold"
        >
          Login
        </button>

        {/* LINKS */}
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/signup" className="text-cyan-400">
            Sign Up
          </Link>

          <Link to="/forgot-password" className="text-gray-400">
            Forgot Password
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;