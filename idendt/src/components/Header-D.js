
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function HeaderDash() {

  const { isAuthenticated, logout } = useAuth();

    
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
          <a href="#" onclick="toggleDropdown(event);" >                My dashboard
</a>
          <ul className="dropdown">
                {isAuthenticated ? (
                  <li>
                    <a href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                ) : (
                  <li>
                    <Link to="/userLogin">Login</Link>
                  </li>
                )}
                {/* <!-- Add more vertical links as needed --> */}
              </ul>
        </li>



      </ul>
    </nav>
  </header>
    </div>
  )
}

export default HeaderDash;
