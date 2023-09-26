import React, { useState } from 'react';
import jobDataArray from '../data/data'; // Import the empty array

function YourFormComponent() {
  const [jobData, setJobData] = useState({
    title: '',
    desc: '',
    image: null, // Initialize image as null
  });

  const handleInputChangeJob = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleImageChangeJob = (e) => {
    const imageFile = e.target.files[0]; // Get the selected image file
    setJobData({
      ...jobData,
      image: imageFile, // Set the selected image file in jobData
    });
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();

    // Create a new job post object
    const newJobPost = {
      title: jobData.title,
      desc: jobData.desc,
      image: jobData.image, // Access the selected image
    };

    // Push the new job post object into the jobDataArray
    jobDataArray.push(newJobPost);
    console.log(newJobPost);


  };

  return (
    <div className="w-full max-w-screen-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Create Job Post</h2>
      <form onSubmit={handleSubmitJob} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Post"
          value={jobData.title}
          onChange={handleInputChangeJob}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          name="desc"
          placeholder="Job Description"
          value={jobData.desc}
          onChange={handleInputChangeJob}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-center">
          <label className="custom-file-upload">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your SVG for the upload icon */}
              </svg>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChangeJob}
              className="w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:bg-red-600"
        >
          Create Job Post
        </button>
      </form>
    </div>
  );
}

export default YourFormComponent;
