import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import HeaderDash from './Header-D';

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    const email = location.state;

    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digits");
    } else {
      const data = {
        otp,
        email,
      };

      try {
        const response = await axios.post('http://localhost:5000/verify', data);
        console.log('Login successful', response.data);

        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/verifiedLogin");
        }, 5000);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
  
      <HeaderDash/>


<div className="main-contain bg-black pt-10 h-[100vh]">


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
        <label for="name" class="form-text">Your OPT</label>
        <div class="form-input-wrapper flexbox-left">
          <input class="form-input"
   type="text"
   name="otp"
   onChange={(e) => setOtp(e.target.value)}
   placeholder='Enter Your OTP' required/>
        </div>
      </div>




      <div class="form-input-max flexbox-left">
        <div class="button-wrapper">
          <button id="form-button" onClick={LoginUser} class="button btn-primary">
            Submit
            <div class="btn-secondary"></div>
          </button>

        </div>
      </div>
    </form>

  </div>

</div>
</section>

</div>

    </>
  );
};

export default Otp;
