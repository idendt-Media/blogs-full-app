import React from 'react'
import {  Link } from 'react-router-dom';


function HeaderDash() {
  return (
    <div>
      
      <header class="header p-2 lg:px-40">
    <nav>
      <div class="logo">
        <Link to={"https://idendt.com"}><img src="/blogs/assets/Mains/idendtLogo.png" class="header-logo" alt=""/></Link>
      </div>
      <input type="checkbox" id="menu-toggle"/>
      <label for="menu-toggle" class="menu-icon" >&#9776;</label>
      <ul class="menu">
       
        <li><a href="index.html#contact" onclick="closeMenu()"> <Link to={"https://idendt.com/#contact"}>My dashbord</Link> </a></li>


      </ul>
    </nav>
  </header>
    </div>
  )
}

export default HeaderDash
