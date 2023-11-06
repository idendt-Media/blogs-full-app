import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import baseUrl from './config'; // Adjust the path accordingly

const PopupForm = ({ isOpen, setIsOpen, jobName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    qualification: '',
    message: '',
    resume: null,
  });


    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObject = new FormData();
      formDataObject.append('name', formData.name);
      formDataObject.append('email', formData.email);
      formDataObject.append('phoneNumber', formData.phoneNumber);
      formDataObject.append('qualification', formData.qualification);
      formDataObject.append('message', formData.message);
      formDataObject.append('message', formData.message);
      formDataObject.append('resume', formData.resume);
      formDataObject.append('jobName', jobName); // Include jobName in the formDataObject

      
      console.log('formDataObject:', formDataObject);

      const response = await axios.post(`${baseUrl}/send-email`, formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = response.data;
  
      if (data.success) {

                setSuccessMessage('Email sent successfully');

        console.log('Email sent successfully');
      } else {
        console.error('Error sending email:', data.error); // Log the error message

        setErrorMessage('An error occurred. Please try again later.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage(null);
    }
  };
  
  
  return (
    <div className={`fixed inset-0 z-10 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-600 opacity-50 p-4 sm:p-0"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-0 sm:p-4 rounded-lg shadow-lg w-full sm:w-[50%] ">
        <h2 className="text-2xl font-semibold mb-4bn text-white capitalize">Apply For : {jobName}</h2>
        {/* Your form content goes here */}



        <div className="max-w-lg mx-auto p-6">
      <form className=" shadow-md rounded px-2 sm:px-8 pt-6 pb-8 mb-4 bg-[#212121]" encType="multipart/form-data">
        <div className="mb-4">
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:w-1/2 md:mr-2">
    
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="text"
                placeholder="Name"
                name="name"

                onChange={handleChange}
              />
            </div>
            <div className="md:w-1/2">
       
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="email"
                placeholder="Email"
                name="email"

                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:w-1/2 md:mr-2">
         
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="number"
                name="phoneNumber"

                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
            <div className="md:w-1/2">
         
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="text"
                name="qualification"

                placeholder="Qualification"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
         
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
              rows="4"
              name="message"
              placeholder="Message"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
           
          <input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4]"
  type="file"
  name="resume"
  onChange={handleChange}
  accept=".pdf, .doc, .docx" // Specify accepted file types
/>

          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" onClick={submitForm}
          >
            Apply Now
          </button>
        </div>

        {successMessage ? (
          <p className="text-green-500 mb-4">{successMessage}</p>
        ) : errorMessage ? (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        ) : null}
      </form>
    </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={togglePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
