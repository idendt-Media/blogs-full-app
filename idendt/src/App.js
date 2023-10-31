import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainBlog from './blogMain';
import Admin from './Admin';
import New from './new';
import Main from './pages/MainBlog';
import Sub from './innerBLog/Blog';
import Sample from './pages/Jobs';
import LoginPage from './components/login';
import UserAuth from './components/userLogin';
import UserSignin from './components/signup';
import Otp from './components/Otp';
import ReferPage from './pages/ReferPage';
import LeadSubmit from './pages/LeadSubmit';
import ViewStatus from './pages/viewStatus';
import StatusCheck from './pages/status-check';
import Status from './pages/status';
import UpdateStatus from './components/updateStatus';
import Sales from './pages/sales';
import VerifiedLogin from './pages/verifiedLogin';

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

    
    <Router basename="/blogs">
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
        <Route path="/sub/:postId" element={<Sub />} />
        <Route path="/careers" element={<Sample />} />
        <Route path="/" element={<Main />} exact />
        <Route path="/userLogin" element={<UserAuth />}  />
        <Route path="/signin" element={<UserSignin/>}  />
        <Route path="/otp" element={<Otp/>}  />
        <Route path="/refer" element={<ReferPage/>}  />
        <Route path="/lead-submit" element={<LeadSubmit/>}  />
        <Route path="/view-status" element={<ViewStatus/>}  />
        <Route path="/data-submitted" element={<StatusCheck/>}  />
        <Route path="/status/:leadId" element={<Status />} />
        <Route path="/us" element={<UpdateStatus/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/verifiedLogin" element={<VerifiedLogin/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
