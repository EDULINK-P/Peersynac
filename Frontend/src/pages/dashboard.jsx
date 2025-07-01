import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/app.css";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { getdashboardData, dashboardCourses, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await getdashboardData();
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEnterRoom = () => {
    navigate(`course/${courseId}`);
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("/dashboard")}>
            EduLink
          </div>
          <div className="user-nav">
            <div className="credit-barge"> 50 credits</div>
            <div className="user-avatar" onClick={toggleDropdown}></div>
            <div className={`dropdown ${dropdownOpen ? "active" : ""}`}>
              <div
                className="dropdown-item"
                onClick={() => navigate("/manage-courses")}
              >
                📚 Manage Courses
              </div>
              <div className="dropdown-item" onClick={handleSignOut}>
                🚪 Sign Out
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <h2 className="page-title"> Welcome</h2>
        <div>
          <h3> Your Study Rooms</h3>
          {dashboardCourses?.length > 0 ? (
            dashboardCourses.map((course, idx) => (
              <div key={idx} className="empty-state">
                <h3>{course.courseName}</h3>
                <p>{course.role === "TA" ? "TA" : "Student"}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEnterRoom(course.id)}
                >
                  Enter Room
                </button>
              </div>
            ))
          ) : (
            <p>You have no courses added yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
