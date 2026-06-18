import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Reset link sent to email");
    } catch (err) {
      setMsg("Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4">

      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-2xl font-bold text-center text-cyan-400 mb-4">
          Reset Password
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-xl font-semibold"
        >
          Send Reset Link
        </button>

        {msg && (
          <p className="text-center text-sm text-gray-300 mt-3">
            {msg}
          </p>
        )}

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-cyan-400">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;