// MainBlog.js
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

  return (
    <div>
      
      {blogPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
            <img src={`http://localhost:5000/Blogs/${post.imageUrl}`} alt={post.title} className='h-[100px] w-[100px]' />
            <Link to={`/inner/${post._id}`}>Read More</Link>

        </div>
      ))}
    </div>
  );
}

export default MainBlog;
