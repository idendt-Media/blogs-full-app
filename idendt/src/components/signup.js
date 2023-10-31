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
      // Basic input validation
      if (!username || !password || !email || !phone) {
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
        company
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


  console.log(localStorage.getItem('userEmail'));

  return (
    <div>





      <HeaderDash/>


<div className="main-contain bg-black pt-10">


    <section class="flex flex-col gap-10 bg-black" id="contact">

<div class="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">

  <h1 class="text-[24px] sm:text-[60px] font-bold text-white">Let’s work together</h1>
  <p class="text-[14px] sm:text-[18px] text-white">Ready to start a project? If you’re excited, we’re excited. Drop
    us a line start the conversation.</p>
</div>
<div class="form flexbox-col px-10 sm:px-14 lg:px-40 ">

  <div class="form-wrapper">
    <div id="form" >
      <div class="form-input-max">
        <label for="name" class="form-text">Your username</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input"
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)} required/>
        </div>
      </div>


           <div class="form-input-max">
        <label for="name" class="form-text">Your Phonenumber</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input" 
type="number"
placeholder="Phone Number"
value={phone}
onChange={(e) => setPhone(e.target.value)} required/>
        </div>
      </div>
  
  
           <div class="form-input-max">
        <label for="name" class="form-text">Your Email</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input" 
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)} required/>
        </div>
      </div>
      <div class="form-input-grid">
        <div>
          <label for="email" class="form-text">Company</label>
          <div class="form-input-wrapper flexbox-left">
            <input class="form-input" type="text"
placeholder="company"
value={company}
onChange={(e) => setCompany(e.target.value)} required/>
          </div>
        </div>
        <div>
          <label for="company" class="form-text">State</label>
          <div class="form-input-wrapper flexbox-left">
            <input class="form-input" placeholder="state"
value={state}
onChange={(e) => setState(e.target.value)} required/>
          </div>
        </div>


         <div>
          <label for="company" class="form-text">city</label>
          <div class="form-input-wrapper flexbox-left">
            <input class="form-input" placeholder="city"
value={city}
onChange={(e) => setCity(e.target.value)} required/>
          </div>
        </div>
      </div>


      <div class="form-input-max">
        <label for="name" class="form-text">Your Password</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input" 
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}required/>
        </div>
      </div>
      


      <div class="form-input-max flexbox-left">
        <div class="button-wrapper">
          <button id="form-button" class="button btn-primary"  onClick={handleSignup}>
            Submit
            <div class="btn-secondary"></div>
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
