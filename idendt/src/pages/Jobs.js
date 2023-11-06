import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GridComponent from '../components/grid';
import PopupForm from '../components/popupForm';
import baseUrl from '../components/config'; // Adjust the path accordingly

function Jobs() {



    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
      async function fetchJobsPosts() {
        try {
          const response = await axios.get(`${baseUrl}/api/job`);
          setJobPosts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }

  
      fetchJobsPosts();
    }, []);


    useEffect(() => {
        console.log(jobPosts,"kutaaa");

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



            const [isOpen, setIsOpen] = useState(false);
            const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job name
          
          
            // Function to handle the "Apply Now" button click
            const handleApplyNowClick = (jobTitle) => {
              setSelectedJob(jobTitle);
              setIsOpen(true);
            };


  return (
    <div className='flex-col justify-center gap-28'>



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


  <section class=" px-5 lg:px-40 py-10 bg-black " >
        <h1 class="text-white text-[30px] lg:text-[40px]">Careers</h1>
      </section>

         <div class="text-div px-5 lg:px-40 py-10 bg-black flex flex-col gap-10">

        <p>Are you ready to be a part of a revolution that combines innovation, technology and growth opportunities? At idenDT, we value talent development, encourage creativity and encourage our team members to achieve their full potential. If you're seeking a career that goes beyond just a job, you're in the right place.</p>
     <button class="read-btn">Join Us</button>
      </div>

<GridComponent/>



<section class=" px-5 lg:px-40 py-20 bg-black " >
        <h1 class="text-white text-[30px] lg:text-[40px]">Open Positions</h1>
      </section>
{jobPosts.map(job=> {
    return(

    <div key={job._id} className='w-full- flex justify-start px-5 lg:px-40 py-8 bg-black'>

        <div className='flex  justify-between gap-12 items-center w-full '>

{/* <div className=' w-[250px] h-[250px]'>

    <img src={`http://localhost:5000/jobs/${job.imageUrlJob}`}  alt="" />
</div> */}

<div className='flex-col justify-start items-center text-white'>

        <h1 className='capitalize text-[24px]'>{job.title}</h1>
        <p>{job.desc}</p>

</div>
        <div>
        <button
          className="bg-[#C4C4C4] text-black w-[120px] h-[40px] rounded-lg"
          onClick={() =>handleApplyNowClick(job.title)}
        >
          Apply Now
        </button>        </div>
        </div>
        <PopupForm isOpen={isOpen} setIsOpen={setIsOpen} jobName={selectedJob} /> {/* Pass selectedJob as a prop */}
    </div>
    )

})

}

<div class="cursor"></div>
      <div class="cursor2"></div>
      
    </div>
  )
}

export default Jobs
