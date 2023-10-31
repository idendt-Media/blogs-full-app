import React from 'react'
import Header from '../components/Header'
import SliderComponent from '../components/slider'
import { Link } from 'react-router-dom'


function Sales() {
  return (

<div className='relative bg-black '>
<Header/>
<img className='h-[80vh] w-full object-cover' src="assets/Mains/sales-banner.png" alt="" />

    <div  className='bg-black  sm:px-40 px-10 flex flex-col gap-10 '>


        <h1 class="text-[24px] sm:text-[60px] text-white my-5 font-bold absolute px-4 left-40 top-[200px] ">Now Anyone on Globe <br />
can Refer and Earn…</h1>

<p class=" text-[14px] sm:text-[18px] text-[#C4C4C4]">idenDT invites you to participate in our innovative initiative, where you can easily refer potential clients and earn rewards. Your role is simple, just log in to our dedicated profile and submit leads. From there, our expert team takes over to handle the rest. If the lead you provide results in a successful conversion, you will be entitled to a generous 10% commission. This initiative enables you to engage in sales effortlessly and unlock the potential for substantial earnings. Join us today and be a part of this rewarding referral program at IdenDT Media. Your referrals can pave the way for mutual success.</p>


<div className='h-[300px] bg-[#212121] flex flex-col gap-4 justify-center items-center  rounded-xl'>
        <h1 class="text-[24px] sm:text-[60px] text-white my-5 font-bold  ">Imagine a Sales Job without Target</h1>
        <Link to="/userLogin">
<p class=" text-[14px] sm:text-[18px] text-white">Join Now </p>
        </Link>


</div>

<h1 class="text-[24px] sm:text-[50px] text-white my-5 font-bold ">Effortless Sales on Your Own Schedule</h1>

<p class=" text-[14px] sm:text-[18px] text-[#C4C4C4]">Imagine a world where you can achieve sales success with ease, working on your terms, without the usual hustle and bustle. This is precisely the vision we're turning into reality. We've redefined the way sales work is done.</p>


<p class=" text-[14px] sm:text-[18px] text-[#C4C4C4]">In a world where work often feels like a grind, we've created an environment where sales become a satisfying and rewarding endeavor. So, if you're looking to achieve your sales goals on your terms, effortlessly and with convenience as your companion, we're here to make it happen. Welcome to the future of sales, where your success is redefined and your convenience is the priority.</p>

<img src="assets/sales/salesImg.png" className='h-full w-full object-contain' alt="" />
    </div>

    <SliderComponent/>

    <footer class="px-10 sm:px-14 lg:px-40 pb-28">
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
  )
}

export default Sales
