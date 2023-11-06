import React, { useState, useEffect } from 'react';
import HeaderDash from '../components/Header-D';
import axios from 'axios';

import baseUrl from './config'; // Adjust the path accordingly

function UpdateStatus() {
    const [data, setData] = useState([]);
      const [showFirst, setShowFirst] = useState(null);
    //   const [status, setStatus] = useState();


    const handleToggle = (leadId, submissionId) => {
      setShowFirst(null);
      updateStatusOnBackend(leadId, submissionId, null);
    };
    
    const handleShowSecond = (leadId, submissionId) => {
      setShowFirst(true);
      updateStatusOnBackend(leadId, submissionId, 'converted');
    };
    
    const handleShowThird = (leadId, submissionId) => {
      setShowFirst(false);
      updateStatusOnBackend(leadId, submissionId, 'not-converted');
    };

    useEffect(() => {
      async function fetchSubmittedData() {
        try {
          const response = await axios.get(`${baseUrl}/submited-data`);
          setData(response.data);
          
         
          console.log(response.data ,"data mon");
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchSubmittedData();
    }, [handleShowSecond]);


    
    const updateStatusOnBackend = async (leadId, submissionId, newStatus) => {
      try {
        await axios.post(`${baseUrl}/update-lead-status/${leadId}`, { submissionId, newStatus });
      } catch (error) {
        console.error('Error updating status:', error);
        // Set state to handle the error
      }
    };



  const sendConvertedEmail = async (email) => {
    try {
      const response = await fetch(`${baseUrl}/send-converted-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email: ', error.message);
    }
  };

  
    return (
      <div>
        <HeaderDash />
  
        <div className="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6 py-20">
          <h1 className="text-[24px] sm:text-[60px] font-bold text-white">Submitted Leads</h1>
  
          {data.map((items, index) => (
  <div key={index} className='p-4 sm:p-16 border border-solid border-gray-500'>
   <div className='pb-10'>

   
    <h1 className="text-white font-bold">Lead : {index + 1}</h1>
    <h1 className="text-white font-bold">Mail : {items.email}</h1>

   </div>
    {/* Map over the submissions array */}
    <ul>
      {items.submissions.map((submission, subIndex) => (
        <li key={subIndex}>
                    <p className="text-white font-semibold tetx-[10px] sm:text-[20px] "> lead No submitted by {items.email} : {subIndex +1}</p>

          <p className="text-white">Service: {submission.service.join(', ')}</p>
          <p className="text-white">status: {submission.status}</p>
          <p className="text-white">Business Name : {submission.businessname}</p>
          {/* Add more fields from the submission object */}


              <div className='flex sm:flex-row flex-col justify-start items-start sm:items-center gap-5 sm:gap-8 py-5'>
      <button
        className={`text-black h-10 w-full sm:w-32  rounded-xl ${submission.status === null ?  'bg-yellow-500' : 'bg-white'}`}
        onClick={() => handleToggle(items._id,submission._id)}
      >
        Pending
      </button>

      <button
        className={`text-black h-10 w-full sm:w-32  rounded-xl ${submission.status === 'converted' ? 'bg-green-500' : 'bg-white'}`}
        onClick={() => {
          handleShowSecond(items._id,submission._id);
          sendConvertedEmail(items.email); // Call the function to send email
        }}
      >
        Converted
      </button>

      <button
        className={`text-black h-10 w-full sm:w-32 rounded-xl text-[12px] sm:text-[16px] ${submission.status === 'not-converted' ? 'bg-red-500' : 'bg-white'}`}
        onClick={() => handleShowThird(items._id,submission._id)}
      >
        Not-Converted
      </button>
    </div>
        </li>
      ))}
    </ul>


  </div>
))}



        </div>
      </div>
    );
}

export default UpdateStatus
