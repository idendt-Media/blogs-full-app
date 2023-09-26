import './mainBlog.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function MainBlog() {

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchBlogPosts();
  }, []);


    useEffect(() => {
      const cursor = document.querySelector('.cursor');
      const cursorinner = document.querySelector('.cursor2');
      const a = document.querySelectorAll('a');
      // const specialSection = document.getElementById('special-section');
  
      const handleMouseMove = (e) => {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        cursorinner.style.left = e.clientX + 'px';
        cursorinner.style.top = e.clientY + 'px';
      };
  
      const handleMouseDown = () => {
        cursor.classList.add('click');
        cursorinner.classList.add('cursorinnerhover');
      };
  
      const handleMouseUp = () => {
        cursor.classList.remove('click');
        cursorinner.classList.remove('cursorinnerhover');
      };
  
      const handleLinkMouseOver = () => {
        cursor.classList.add('hover');
      };
  
      const handleLinkMouseLeave = () => {
        cursor.classList.remove('hover');
      };
  
   
  
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
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
  
      a.forEach((item) => {
        item.addEventListener('mouseover', handleLinkMouseOver);
        item.addEventListener('mouseleave', handleLinkMouseLeave);
      });
  

      const menuToggle = document.getElementById('menu-toggle');
      menuToggle.addEventListener('touchstart', toggleDropdown);
  
      return () => {
        // Clean up event listeners when the component unmounts
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        a.forEach((item) => {
          item.removeEventListener('mouseover', handleLinkMouseOver);
          item.removeEventListener('mouseleave', handleLinkMouseLeave);
        });

        menuToggle.removeEventListener('touchstart', toggleDropdown);
      };
    }, []);
  return (
    <div>
          


          <header class="header p-2 lg:px-40">
    <nav>
      <div class="logo">
        <Link to={"https://idendt.com"}><img src="assets/Mains/idendtLogo.png" class="header-logo" alt=""/></Link>
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

      <section class="px-5 lg:px-40 py-20 bg-black" >
        <h1 class="text-white text-[30px] lg:text-[40px]">Our Blog</h1>
      </section>

    
      <main class="h-full w-full bg-[#212121] px-5 lg:px-40 pb-40  ">

        <div class="main-container">

     



  
        <div class="blog-container flex  justify-center ">
       


            <div class="blog-box h-full  mt-20 ">

                <img src="assets/blogs/Blog-poster-01-a.jpg" alt="" className='object-contain'/>

            </div>
        </div>


      </div>


      <div class="text-div py-20 flex flex-col gap-6">

        <h1>Branding</h1>
        <p>A brand is all about the emotions it evokes in the market. It is not limited to a visual identity, a logo, or a design for a product or service, but rather, it's a comprehensive system that integrates all channels and points of contact. We provide an end-to-end range of services, from communications to style manuals, naming, logo creation and placing you right in the marke</p>
     <button class="read-btn">Read More</button>
      </div>


      <div class="card-section ">
        <div class="card-wrapper">
          <div class="cards">
   
          {blogPosts.map((post) => (


            <div class="card-box" key={post._id}>
              <div class="image">
                <img src={`http://localhost:5000/Blogs/${post.imageUrl}`} alt={post.title}/>
              </div>
              <div class="texts">
                <h1 class="card-head">{post.title}</h1>
                <p class="card-para">{post.content}</p>
                
                <button class="read-btn">            <Link to={`/sub/${post._id}`}>Read More</Link>
</button>

              </div>
            </div>

))}








          </div>
        </div>
      </div>

      </main>

      <div class="cursor"></div>
      <div class="cursor2"></div>
    
    </div>
  )
}

export default MainBlog
