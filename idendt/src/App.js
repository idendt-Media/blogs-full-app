import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainBlog from './blogMain';
import Admin from './Admin';
import New from './new';
import Main from './pages/MainBlog';
import Sub from './innerBLog/Blog';
import Sample from './pages/Jobs';
import LoginPage from './components/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login and set isAuthenticated to true
  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("User is authenticated"); // Check if this message is logged
  };

  // Function to handle logout and set isAuthenticated to false
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (

    
    <Router>
      <Routes>
        <Route path="/inner/:postId" element={<New />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin onLogout={handleLogout} />
            ) : (
              <>
                <Navigate to="/login" />
                <p>User is not authenticated. Redirecting to login...</p>
              </>
            )
          }
        />
        <Route path="/main" element={<MainBlog />} />
        <Route path="/" element={<Main />} />
        <Route path="/sub/:postId" element={<Sub />} />
        <Route path="/careers" element={<Sample />} />
      </Routes>
    </Router>
  );
}

export default App;
