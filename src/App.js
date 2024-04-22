import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component
import { LoginContext } from './LoginContext';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import CreateTask from './Components/CreateTask';


const App = () => {
  // Login state management logic (if using Context)
  // const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [firstName, setFirstname] = useState("");
  useEffect(() => {
    console.log(token);
    setToken(localStorage.getItem('token'));
    setFirstname(localStorage.getItem('firstName'))
  })

  const login = (userData) => {
    setToken(userData.token);
    setFirstname(userData.firstName)
  };

  const logout = () => {
    setToken(null);
    setFirstname(null);
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
  };

  return (
    <LoginContext.Provider value={{ token, firstName, login, logout }}>  {/* Provide context if applicable*/}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;
