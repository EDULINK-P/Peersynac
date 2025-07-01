import React, { createContext, use, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signup = async (name, email, password) => {
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.user) setUser(data.user);
    return data;
  };

  const submitprofile = async (selectedCourses) => {
    const filledCourses = selectedCourses.filter(item => item.courseId && item.role);
    if (filledCourses.length !== 2) {
      alert("Please select two courses");
      return false;
    }
    const courses = filledCourses.map(item => item.courseId);
    const roles = filledCourses.map(item => item.role);

    const res = await fetch("http://localhost:3000/profile/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ courses, roles }),
    });

    const data = await res.json();

    if (res.ok) {
      setDashboardCourses(data.courses || []);
      return { success: true, message: "Profile submitted successfully" }
    } else {
      return { success: false, message: "Error submitting profile" }
    }
  };

  const getcourse = async () => {
    try{
      const res = await fetch("http://localhost:3000/courses", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Could not get courses");
      }
      const data = await res.json();
      if (data.courses) setCourseOptions(data.courses);
      return data;
    } catch (error) {
      console.error("Error fetching courses:",error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        loading,
        submitprofile,
        getcourse,
        courseOptions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
