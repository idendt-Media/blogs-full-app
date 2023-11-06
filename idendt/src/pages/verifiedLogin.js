import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderDash from '../components/Header-D';
import baseUrl from '../components/config'; // Adjust the path accordingly


import '../App.css';

function VerifiedLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login-user`, {
        email,
        password,
      });

      const data = response.data;

      if (data.message === 'Login successful') {
        navigate('/refer', { state: email });
      }
    } catch (error) {
      console.error('Login failed', error.response.data);
      setError('Invalid email or password'); // Set the error message
    }
  };

  return (
    <div>
      <HeaderDash />

      <div className="bg-black px-10 sm:px-14 lg:px-40 flex flex-col justify-start items-center gap-16 h-full py-10">
        <img src="assets\sales\successIcon.png" alt="" />
        <p className="text-white">Your Account is Created Successfully</p>
      </div>

      <section className="flex flex-col gap-10 bg-black" id="contact">
        <div className="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">
          <h1 className="text-[24px] sm:text-[60px] font-bold text-white">
            Let’s work together
          </h1>
          <p className="text-[14px] sm:text-[18px] text-white">
            Ready to start a project? If you’re excited, we’re excited. Drop us
            a line start the conversation.
          </p>
        </div>
        <div className="form flexbox-col px-10 sm:px-14 lg:px-40 ">
          <div className="form-wrapper">
            <form id="form">
              <div className="form-input-max">
                <label htmlFor="name" className="form-text">
                  Your Email
                </label>
                <div className="form-input-wrapper flexbox-left">
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-input-max">
                <label htmlFor="name" className="form-text">
                  Your Password
                </label>
                <div className="form-input-wrapper flexbox-left">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-input-max flexbox-left">
                <div className="button-wrapper">
                  <button
                    id="form-button"
                    onClick={handleLogin}
                    className="button btn-primary"
                  >
                    Submit
                    <div className="btn-secondary"></div>
                  </button>
                  {error && (
                    <p className="text-red-500 pt-10">invaild password or Email</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerifiedLogin;
