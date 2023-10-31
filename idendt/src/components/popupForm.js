import React, { useState } from 'react';

const PopupForm = ({ isOpen, setIsOpen, jobName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    qualification: '',
    message: '',
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className={`fixed inset-0 z-10 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4bn text-white capitalize">Apply For : {jobName}</h2>
        {/* Your form content goes here */}



        <div className="max-w-lg mx-auto p-6">
      <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-[#212121]">
        <div className="mb-4">
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:w-1/2 md:mr-2">
    
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="md:w-1/2">
       
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:w-1/2 md:mr-2">
         
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
            <div className="md:w-1/2">
         
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
                type="text"
                placeholder="Qualification"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
         
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4] placeholder-black"
              rows="4"
              placeholder="Message"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
           
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-[#C4C4C4]"
              type="file" 
              onChange={handleChange}code 
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
