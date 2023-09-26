import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function New() {
  const { postId } = useParams();
  console.log('Post ID:', postId);

  const [matchedBlogPost, setMatchedBlogPost] = useState({});
  const [remainingBlogPosts, setRemainingBlogPosts] = useState([]);
  console.log('Matched Blog Post:', matchedBlogPost);
  console.log('Remaining Blog Posts:', remainingBlogPosts);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
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

  return (
    <div>
      <Link to="/">Back to Blog</Link>
      <h2>{matchedBlogPost.title}</h2>
      <p>{matchedBlogPost.content}</p>
      <img src={`http://localhost:5000/Blogs/${matchedBlogPost.imageUrl}`} alt="" className='w-[200px] h-[200px]'/>



      <h3>Remaining Blog Posts</h3>
      <ul>
        {remainingBlogPosts.map(post => (
          <li key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <img src={`http://localhost:5000/Blogs/${post.imageUrl}`} alt="" className='w-[200px] h-[200px]'/>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default New;
