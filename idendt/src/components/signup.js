import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './login.css'; // Import the CSS file for styling
import HeaderDash from './Header-D';

function UserAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Get the navigate function from the hook
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Reset error message
      setErrorMessage('');

      // Basic input validation
      if (!username || !password || !email || !phone || !company || !state || !city) {
        setErrorMessage('All fields are required');
        return;
      }

      localStorage.setItem('userEmail', email);

      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        email,
        phone,
        state,
        city,
        company,
      });

      console.log(response.data.message);

      // If signup is successful, navigate to the login page
      if (response.data.message === 'Signup successful') {
        navigate('/userLogin');
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <HeaderDash />

      <div className="main-contain bg-black pt-10">
        <section className="flex flex-col gap-10 bg-black" id="contact">
          <div className="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">
            <h1 className="text-[24px] sm:text-[60px] font-bold text-white">Let’s work together</h1>
            <p className="text-[14px] sm:text-[18px] text-white">
              Ready to start a project? If you’re excited, we’re excited. Drop us a line start the conversation.
            </p>
          </div>
          <div className="form flexbox-col px-10 sm:px-14 lg:px-40 ">
            {/* Display error message */}
            {errorMessage && <p className="error-message text-red-600">{errorMessage}</p>}

            <div className="form-wrapper">
              <div id="form">
                {/* Username */}
                <div className="form-input-max">
                  <label htmlFor="username" className="form-text">
                    Your username
                  </label>
                  <div className="form-input-wrapper flexbox-left">
                    <input
                      className={`form-input ${!username && 'error'}`}
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  {!username && <p className="error-message text-red-600">Username is required</p>}
                </div>

                {/* Phone Number */}
                <div className="form-input-max">
                  <label htmlFor="phone" className="form-text">
                    Your Phonenumber
                  </label>
                  <div className="form-input-wrapper flexbox-left">
                    <input
                      className={`form-input ${!phone && 'error'}`}
                      type="number"
                      id="phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  {!phone && <p className="error-message text-red-600">Phone Number is required</p>}
                </div>

                {/* Email */}
                <div className="form-input-max">
                  <label htmlFor="email" className="form-text">
                    Your Email
                  </label>
                  <div className="form-input-wrapper flexbox-left">
                    <input
                      className={`form-input ${!email && 'error'}`}
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {!email && <p className="error-message text-red-600">Email is required</p>}
                </div>

                {/* Company */}
                <div className="form-input-grid">
                  <div>
                    <label htmlFor="company" className="form-text">
                      Company
                    </label>
                    <div className="form-input-wrapper flexbox-left">
                      <input
                        className={`form-input ${!company && 'error'}`}
                        type="text"
                        id="company"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>
                    {!company && <p className="error-message text-red-600">Company is required</p>}
                  </div>
                  {/* State */}
                  <div>
                    <label htmlFor="state" className="form-text">
                      State
                    </label>
                    <div className="form-input-wrapper flexbox-left">
                      <input
                        className={`form-input ${!state && 'error'}`}
                        type="text"
                        id="state"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    {!state && <p className="error-message  text-red-600">State is required</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="form-text">
                      City
                    </label>
                    <div className="form-input-wrapper flexbox-left">
                      <input
                        className={`form-input ${!city && 'error'}`}
                        type="text"
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    {!city && <p className="error-message text-red-600">City is required</p>}
                  </div>
                </div>

                {/* Password */}
                <div className="form-input-max">
                  <label htmlFor="password" className="form-text">
                    Your Password
                  </label>
                  <div className="form-input-wrapper flexbox-left">
                    <input
                      className={`form-input ${!password && 'error'}`}
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {!password && <p className="error-message text-red-600">Password is required</p>}
                </div>

                {/* Submit Button */}
                <div className="form-input-max flexbox-left">
                  <div className="button-wrapper">
                    <button id="form-button" className="button btn-primary" onClick={handleSignup}>
                      Submit
                      <div className="btn-secondary"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>




</div>


    </div>
  );
}

export default UserAuth;
