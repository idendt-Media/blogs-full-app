import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './blog.css';

function BLog() {
  const { postId } = useParams();
  console.log('Post ID:', postId);

  const [matchedBlogPost, setMatchedBlogPost] = useState({});
  const [remainingBlogPosts, setRemainingBlogPosts] = useState([]);
  console.log('Matched Blog Post:', matchedBlogPost);
  console.log('Remaining Blog Posts:', remainingBlogPosts);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await axios.get('https://idendt-db.onrender.com/api/blog');
        const matchingPost = response.data.find(post => post._id === postId);
        if (matchingPost) {
          setMatchedBlogPost(matchingPost);
          const remainingPosts = response.data.filter(post => post._id !== postId);
          setRemainingBlogPosts(remainingPosts);
          console.log('API Response:', matchingPost);
        } else {
          console.error('Blog post not found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchBlogPosts();
  }, [postId]);

  
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
      <li ><a href="./vertical1.html" ><Link to={"/admin"} >Admin</Link></a></li>
      {/* style={{ display: 'none' }} */}



      </ul>
    </nav>
  </header>

  <section class=" px-5 lg:px-40 py-20 bg-black " >
    <h1 class="text-white text-[30px] lg:text-[40px]">Our Blog</h1>
  </section>

    
      <div class="h-full w-full bg-[#212121] px-5 lg:px-40 pb-40 flex flex-col sm:flex-row">

        <div class=" flex-[1.8] p-8">

     



  
        <div class="blog-container flex  justify-center ">
       


            <div class="blog-box-inner   ">

                <img src={`https://idendt-db.onrender.com/Blogs/${matchedBlogPost.imageUrl}`}  alt="" class="blogbanner"/>

            </div>

        </div>


        <div class="text-div py-20 flex flex-col gap-6">
  
            <h1 class="card-head">{matchedBlogPost.title}</h1>
            <p class="card-para whitespace-pre-line">{matchedBlogPost.fullContent}</p>
            
        </div>
        </div>





      <div class="card-section flex-1 ">
        <div class="card-wrapper">
          <div class="cards flex flex-col justify-center p-5 gap-5">
          <h1 class="text-white text-[20px]">Recent Blogs</h1>


      

            {remainingBlogPosts.map(post => (

            <div class="card"  key={post._id}>

                <div class="image">
                <Link to={`/sub/${post._id}`}>

                  <img src={`https://idendt-db.onrender.com/Blogs/${post.imageUrl}`} alt=""/>
                </Link>
                </div>
                <div class="texts">
                  <h1 class="card-head sub">{post.title}</h1>
                  
                  
                </div>
            </div>

))}


          </div>
        </div>
      </div>

      </div>

      <div class="cursor"></div>
      <div class="cursor2"></div>
    


    </div>
   

  )
}

export default BLog
