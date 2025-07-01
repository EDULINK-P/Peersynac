import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { AuthProvider } from "../src/context/authContext";
import Signup from "./pages/signup";
import ProfileSetup from "./pages/profileSetup";
import "../src/assets/app.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profileSetup" element={<ProfileSetup />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
