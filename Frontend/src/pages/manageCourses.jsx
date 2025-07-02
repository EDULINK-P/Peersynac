import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const ManageCourses = () => {
  const { user, getcourse, addcourse, getdashboardData } = useAuth();
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [selected, setSelected] = useState({ courseId: "", role: "Student" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getcourse();
        setCourses(res.courses || []);
        setUserCourses(user?.courses || []);
      } catch (error) {
        console.error("Failed to load courses", error);
      }
    };
    fetchData();
  }, [getcourse, user?.courses]);

  const handleAdd = async () => {
    if (userCourses.length >= 5) {
      alert("You have reached the maximum number of courses");
      return;
    }
    const alreadyExists = userCourses.some(
      (c) =>
        c.courseId === parseInt(selected.courseId) && c.role === selected.role
    );
    if (alreadyExists) {
      alert("This course already exists in your dashboard");
      return;
    }
    try {
      const newCourse = await addcourse(
        parseInt(selected.courseId),
        selected.role
      );
      setUserCourses((prev) => [...prev, newCourse]);
      await getdashboardData();
      alert("Course added successfully!");
    } catch (error) {
      alert(error.message || "Failed to add course");
    }
  };
  return (
    <main className="main">
      <div className="page-header">
        <h2 className="page-title">Manage Course </h2>
        <button className="btn-secondary" onClick={() => window.history.back()}>
          Back to Dashboard
        </button>
      </div>
      {userCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses added yet</h3>
          <p>Add your first course to get started with EduLink</p>
        </div>
      ) : (
        userCourses.map((c, i) => (
          <div key={i} className="empty-state">
            <h3>{c.courseName}</h3>
            <p>{c.role}</p>
          </div>
        ))
      )}
      <div className="form-selection">
        <select
          className="form-select"
          value={selected.courseId}
          onChange={(e) =>
            setSelected({ ...selected, courseId: e.target.value })
          }
        >
          <option value="">Select a Course</option>
          {courses &&
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
        </select>
        <select
          className="form-select"
          value={selected.role}
          onChange={(e) => setSelected({ ...selected, role: e.target.value })}
        >
          <option value="Student">Student</option>
          <option value="TA">TA</option>
        </select>
        <button className="btn-primary" onClick={handleAdd}>
          Add Course
        </button>
      </div>
    </main>
  );
};

export default ManageCourses;
