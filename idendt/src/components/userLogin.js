import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import HeaderDash from './Header-D';
import baseUrl from './config'; // Adjust the path accordingly


import "../App.css"

function UserAuth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const  navigate = useNavigate()

  const handleLogin = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior

    try {


      const response = await axios.post(`${baseUrl}/login`, { email, password });

      localStorage.setItem('userEmail', email);

      console.log('Login successful', response.data);


      const data = response.data

            const  tocken= response.data.token



      if(data.message==="Login successful" && tocken){
        console.log(data, "vaadaa kannapa");

        console.log(tocken , "jwt tocken");

                onLogin(tocken);

        navigate("/otp",{state:email})
      }



      
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error('Login failed', error.response.data);
      setError('Invalid email or password'); // Set the error message

      // Handle login failure, e.g., display an error message
    }
  };

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

{error && (
                      <p className="text-red-500 pt-10">{error}</p>
                    )}
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




      
 

      <div class="form-input-max flexbox-left ">
        <div class="button-wrapper flex flex-col gap-10">
          <button id="form-button" onClick={handleLogin} class="button btn-primary">
            Submit
            <div class="btn-secondary"></div>
          </button>


          <Link to={"/signin"}>
<button id="form-button-new" className='text-white' >sign up</button>
</Link>
        </div>
      </div>
    </form>

  </div>

</div>
</section>


<footer class="bg-black px-10 sm:px-14 lg:px-40 pb-28">
<h1 class="text-[24px] sm:text-[60px] text-white my-5 font-bold">It's nice to meet ya</h1>

<div class="flex flex-col-reverse md:flex-row gap-10 ">
  <div class="flex flex-col gap-14 text-white flex-1 text-[18px]">


    <p class="max-w-[500px] text-[14px] sm:text-[18px] text-[#C4C4C4]">For general enquiries, Feel free to get in
      touch. Alternatively, if you know your project details - head over to our project planner for a more refined
      step-by-step process.</p>
    <div class="flex flex-col gap-6">

      <span class="flex flex-row justify-start gap-6"> <img src="assets/Footer/iconPhone.png" alt=""
          class="adressImg"/>
        <p class="text-[14px] sm:text-[18px] text-[#C4C4C4]">+91 484 356 1391</p>
      </span>
      <span class="flex flex-row justify-start gap-6"><img src="assets/Footer/iconMail.png" alt="" class="adressImg"/>
        <p class="text-[14px] sm:text-[18px] text-[#C4C4C4]">hello@idendt.com</p>
      </span>
      <span class="flex flex-row justify-start gap-6"><img src="assets/Footer/IconWeb.png" alt="" class="adressImg"/>
        <p class="text-[14px] sm:text-[18px] text-[#C4C4C4]">www.idendt.com</p>
      </span>
    </div>

    <div class=" flex flex-row gap-8 justify-start">
      <a href="">
        <img src="assets/Footer/sm-icon1.png" alt="" class="sm-icons"/>

      </a>
      <a href="">

        <img src="assets/Footer/sm-icon2.png" alt="" class="sm-icons"/>
      </a>

      <a href="">

        <img src="assets/Footer/sm-icon3.png" alt="" class="sm-icons"/>
      </a>

      <a href="">

        <img src="assets/Footer/sm-icon4.png" alt="" class="sm-icons"/>
      </a>

      <a href="">

        <img src="assets/Footer/sm-icon5.png" alt="" class="sm-icons"/>
      </a>

      <a href="">

        <img src="assets/Footer/sm-icon6.png" alt="" class="sm-icons"/>
      </a>

      <a href="">

        <img src="assets/Footer/sm-icon7.png" alt="" class="sm-icons"/>
      </a>

    </div>
  </div>
  <div class="flex-1 ">
    <img src="assets/Footer/map.png" alt="" class="h-[262px] md:h-[362px]  object-cover"/>
  </div>
</div>
</footer>

</div>


    </div>
  );
};

export default UserAuth;
