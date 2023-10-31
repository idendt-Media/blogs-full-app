import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,  } from 'react-router-dom';
import HeaderDash from '../components/Header-D';

import "../App.css"

function VerifiedLogin() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const  navigate = useNavigate()

  const handleLogin = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('http://localhost:5000/login-user', { email, password });
      console.log('Login successful', response.data);


      const data = response.data


      if(data.message==="Login successful"){
        console.log(data, "vaadaa kannapa");
        navigate("/refer",{state:email})
      }



      
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error('Login failed', error.response.data);
      // Handle login failure, e.g., display an error message
    }
  };








  return (
    <div>
        <HeaderDash/>

        <div class=" bg-black px-10 sm:px-14 lg:px-40 flex flex-col justify-start items-center gap-16 h-full py-10">

            <img src="assets\sales\successIcon.png" alt="" />

            <p className='text-white'>Your Account is Created Successfully</p>


      





      
    </div>

    <section class="flex flex-col gap-10 bg-black" id="contact">

<div class="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">

  <h1 class="text-[24px] sm:text-[60px] font-bold text-white">Let’s work together</h1>
  <p class="text-[14px] sm:text-[18px] text-white">Ready to start a project? If you’re excited, we’re excited. Drop
    us a line start the conversation.</p>
</div>
<div class="form flexbox-col px-10 sm:px-14 lg:px-40 ">

  <div class="form-wrapper">
    <form id="form" >
      <div class="form-input-max">
        <label for="name" class="form-text">Your Email</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input"
type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
      </div>


           <div class="form-input-max">
        <label for="name" class="form-text">Your Password</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input" 
 type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  required/>
        </div>
      </div>




      
 

      <div class="form-input-max flexbox-left">
        <div class="button-wrapper">
          <button id="form-button" onClick={handleLogin} class="button btn-primary">
            Submit
            <div class="btn-secondary"></div>
          </button>
          {/* <Link to={"/signin"}>
<button className='text-white' >sign up</button>
</Link> */}
        </div>
      </div>
    </form>

  </div>

</div>
</section>
    </div>
  )
}

export default VerifiedLogin
