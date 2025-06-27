import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/app.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate("/")}>
          EduLink
        </div>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
