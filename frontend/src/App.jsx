import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT PAGE */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;