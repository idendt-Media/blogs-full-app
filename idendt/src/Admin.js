import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DeletJobs from './components/DeleteJobs';
import  './admin.css';
import { Link } from 'react-router-dom';




function Admin() {
  const [formData, setFormData] = useState({ title: '', content: '', fullContent: '' });
  const [jobData, setJobData] = useState({ title: '', desc: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileJob, setImageFileJob] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const closeMenu = () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('fullContent', formData.fullContent);
      data.append('image', imageFile); // Add the image file to the form data

      await axios.post('http://localhost:5000/api/blog', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });

      // Clear the form fields after successful submission
      setFormData({ title: '', content: '', fullContent: '' });
      setImageFile(null);

      console.log('Blog post submitted successfully');
    } catch (error) {
      console.error('Error:', error);
    }

  };



// job
const handleInputChangeJob = (e) => {
  const { name, value } = e.target;
  setJobData({ ...jobData, [name]: value });
};


const handleImageChangeJob = (e) => {
  const fileJob = e.target.files[0];
  setImageFileJob(fileJob);
};



const handleSubmitJob = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append('title', jobData.title);
    data.append('desc', jobData.desc);
    data.append('image', imageFileJob); // Add the image file to the form data

    await axios.post('http://localhost:5000/api/job', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });

    // Clear the form fields after successful submission
    setJobData({ title: '', desc: '' });
    setImageFile(null);

    console.log('Blog post submitted successfully');
  } catch (error) {
    console.error('Error:', error);
  }

};




  return (


    <div className='bg-black'>


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


  <div>


      <section className=" px-5 lg:px-40 py-20 bg-black " >
        <h1 className="text-white text-[30px] lg:text-[40px]">Our Blog</h1>
      </section>

    <div className='w-full max-w-screen-md mx-auto p-4 '>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Create Blog Post</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
        />
 <textarea
  name="fullContent"
  placeholder="Content Full"
  value={formData.fullContent}
  onChange={handleInputChange}
  className='w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
  rows={10} // You can adjust the number of rows to your preference
/>

<div className=' flex justify-center'>
  
<label className="custum-file-upload">
<div className="icon">
<svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
</div>
<div className="text">
   <span>Click to upload image</span>
   </div>
   <input
          type="file" // Use file input for uploading images
          accept=".jpg, .jpeg, .png" // Specify accepted file types if needed
          onChange={handleImageChange}
          className='w-full'
        />
        </label>
   
</div>
        <button
          type="submit"
          onClick={handleSubmit}
          className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:bg-red-600'
        >
          Create Blog Post
        </button>
      </form>
    </div>
          </div>











          <div>


<section className=" px-5 lg:px-40 py-20 bg-black " >
  <h1 className="text-white text-[30px] lg:text-[40px]">Jobs Section</h1>
</section>

<div className='w-full max-w-screen-md mx-auto p-4 '>
<h2 className='text-2xl font-semibold mb-4 text-white'>    Create Job Post
</h2>
<form onSubmit={handleSubmitJob} className='space-y-4'>
  <input
    type="text"
    name="title"
    placeholder="Job Post"
    value={jobData.title}
    onChange={handleInputChangeJob}
    className='w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
  />
  <textarea
    name="desc"
    rows={4}
    placeholder="Job Description"
    value={jobData.desc}
    onChange={handleInputChangeJob}
    className='w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
  />
 
<div className=' flex justify-center'>

<label className="custum-file-upload">
<div className="icon">
<svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
</div>
<div className="text">
<span>Click to upload image</span>
</div>
<input
    type="file" // Use file input for uploading images
    accept=".jpg, .jpeg, .png" // Specify accepted file types if needed
    onChange={handleImageChangeJob}
    className='w-full'
  />
  </label>

</div>
  <button
    type="submit"
    onClick={handleSubmitJob}
    className='w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:bg-red-600'
  >
    Create Job Post
  </button>
</form>
</div>
    </div>



<DeletJobs/>










    </div>
  );
}

export default Admin;
