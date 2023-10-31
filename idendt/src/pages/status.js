import React, { useState, useLayoutEffect } from 'react';
import HeaderDash from '../components/Header-D';
import axios from 'axios';
import {  useParams } from 'react-router-dom';


function Status() {
  const [status, setStatus] = useState();
  const { leadId } = useParams(); // Extract the ID from the URL



  
     
      useLayoutEffect(() => {
      async function fetchStatus() {


      try {
        const response = await axios.get(`http://localhost:5000/fetch-status/${leadId}`);
  
        if (response.data) {
          setStatus(response.data.status);

          console.log(response.data.status ,"fundeyyyyyyyyyyy");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchStatus();
  }, [leadId,status]); // Include leadId in the dependency array
  





  return (
    <div>
      <HeaderDash />

      <div className='text-white bg-black h-[100vh] px-20 sm:px-40 flex flex-col justify-center items-center'>
        {status === null && (
          <p className='p-16 border border-solid border-gray-500'>
            Your lead is presently in the process of being handled, and we anticipate that it may require some additional time for completion.
          </p>
        )}
        {status === 'converted' && (
          <p className='p-16 border border-solid border-blue-500'>
            We appreciate your outstanding effort! We are pleased to inform you that your lead has successfully been converted. An invoice pertaining to the business transaction will be promptly forwarded to your email address. Kindly anticipate the processing of your payment, which is scheduled to be credited within 7 to 8 working days. Refer more and Earn more...
          </p>
        )}
        { status === 'not-converted' && (
          <p className='p-16 border border-solid border-red-500'>
            We regret to inform you that the lead you submitted has not been converted. Detailed reasons have been communicated to you via email. Do not be disheartened. Persevere and keep trying. Your persistence will pay off..
          </p>
        )}


      </div>
    </div>
  );
}

export default Status;
