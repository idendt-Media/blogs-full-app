import React, { useState } from 'react'
import HeaderDash from '../components/Header-D'
import { Link } from 'react-router-dom'

function ViewStatus() {





  return (
    <div>
        <HeaderDash/>

        <div class=" bg-black px-10 sm:px-14 lg:px-40 flex flex-col justify-start items-center gap-16 h-[100vh] py-10">

            <img src="assets\sales\successIcon.png" alt="" />

            <p className='text-white'>Your Lead has been successfully submitted</p>


            <div className='flex justify-center items-center gap-10'>


            <Link to={""}>
            <button className='h-[67px] w-[301px] bg-[#212121] text-white rounded-lg'>View Status</button>
            </Link>
            <p className='text-white'>or</p>
            <Link  to={"/lead-submit"}>
            <button className='h-[67px] w-[301px] bg-[#212121] text-white rounded-lg'>Sumbit New Lead</button>
            </Link>
            </div>





      
    </div>
    </div>
  )
}

export default ViewStatus
