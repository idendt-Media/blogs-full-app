import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {


    
    useEffect(() => {

  
   
  
        const toggleDropdown = (event) => {
          event.preventDefault();
          const dropdown = event.target.nextElementSibling;
    
          if (window.innerWidth <= 1200) {
            dropdown.style.display = dropdown.style.display === 'contents' ? 'none' : 'contents';
          } else {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          }
        };
    
        const closeMenu = () => {
          const dropdowns = document.querySelectorAll('.dropdown');
          dropdowns.forEach((dropdown) => {
            dropdown.style.display = 'none';
          });
        };
  
      }, []);
  
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
        <li>
          <a href="#" onclick="toggleDropdown(event);" >Verticals</a>
          <ul class="dropdown">
            <li><a href="./vertical2.html"><Link to={"https://idendt.com"}>idenDT Media </Link> </a></li>
            <li><a href="./vertical1.html"><Link to={"https://idendt.com/Avdertisements/ads.html"}>idenDT Advertisements</Link></a></li>

            <li><a href="./vertical1.html"><Link to={"https://idendt.com/cinemas/cinemas.html"}>idenDT Cinemas</Link></a></li>

            {/* <!-- Add more vertical links as needed --> */}
          </ul>
        </li>
        <li><a href="blog.html" onclick="closeMenu()"> <Link to={"/"}>Blogs</Link> </a></li>
        <li><a href="./vertical1.html"><Link to={"/careers"}>Careers</Link></a></li>

        <li><a href="index.html#contact" onclick="closeMenu()"> <Link to={"https://idendt.com/#contact"}>Contact</Link> </a></li>


      </ul>
    </nav>
  </header>
    </div>
  )
}

export default Header
