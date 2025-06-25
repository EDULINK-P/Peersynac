import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "../assets/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <h1 className="hero-title">
            Connect.Learn.<span className="gradient-text">Grow.</span>
          </h1>
          <p className="hero-subtitle">
            Join study sessions with TAs, access resources, and build your
            acdemic network with EduLink's credit-based learning platform.
          </p>
          <div className="cta-button">
            <button
              className="btn-cta-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
            <button
              className="btn-cta-secondary"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
          <section className="features">
            <div className="feature-card">
              <div className="feature-icon-pink">📚</div>
              <h3 className="feature-title">Study Rooms</h3>
              <p className="feature-description">
                Join live Zoom sessions with TAs and earn credits while
                learning.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-purple">🧠</div>
              <h3 className="feature-title">Smart Recommendation</h3>
              <p className="feature-description">
                Get Recommendations on TA based on Course, Credits and
                Availability
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-Indigo">💳</div>
              <h3 className="feature-title">Credit System</h3>
              <p className="feature-description">
                Earn credits by participating and use them to request 1:1
                sessions.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
