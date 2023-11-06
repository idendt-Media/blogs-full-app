import React, { useState, useLayoutEffect } from 'react';
import HeaderDash from '../components/Header-D';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import baseUrl from '../components/config'; // Adjust the path accordingly



function Status() {
  const [status, setStatus] = useState([]);
  const { leadId } = useParams(); // Extract the ID from the URL



  
     
      useLayoutEffect(() => {
      async function fetchStatus() {


      try {
        const response = await axios.get(`${baseUrl}/fetch-status/${leadId}`);
        console.log(response.data.submissions , "bubsyyyy");
  
        if (response) {
          setStatus(response.data.submissions);

          console.log(response.data.submissions ,"fundeyyyyyyyyyyy");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchStatus();
  }, [leadId,status]); // Include leadId in the dependency array
  



console.log(status ,"satatus");

  return (
    <div>
      <HeaderDash />

      <div className='text-white bg-black py-32 px-10 sm:px-40 flex flex-col gap-10 justify-center items-center'>


      {status.map((statusItem) => (

          <div>

     
    
{!statusItem.status && !statusItem.status === null && !statusItem.status === 'converted' && !statusItem.status === 'not-converted' && (
  <p className='p-16 border border-solid border-gray-500'>
    You haven't submitted any leads yet
  </p>
)}
     
        {statusItem.status === null && (
          <div className='p-4 sm:p-16 border border-solid border-gray-500 flex flex-col gap-4'>


          <h2 className='text-white font-semibold text-[20px]'>The status of lead : {statusItem.businessname} </h2>
          <p className='text-[12px] sm:text-[16px] ' >
            Your lead is presently in the process of being handled, and we anticipate that it may require some additional time for completion.
          </p>
          </div>
        )}
        {statusItem.status === 'converted' && (

          <div className='p-4 sm:p-16  border border-solid border-blue-500 flex flex-col gap-4'>
          <h2 className='text-white font-semibold text-[20px]'>The status of lead : {statusItem.businessname} </h2>

          <p className='text-[12px] sm:text-[16px] ' >
            We appreciate your outstanding effort! We are pleased to inform you that your lead has successfully been converted. An invoice pertaining to the business transaction will be promptly forwarded to your email address. Kindly anticipate the processing of your payment, which is scheduled to be credited within 7 to 8 working days. Refer more and Earn more...
          </p>
          </div>
        )}
        { statusItem.status === 'not-converted' && (
          <div className='p-4 sm:p-16  border border-solid border-red-500 flex flex-col gap-4'>
          <h2 className='text-white font-semibold text-[16px] sm:text-[20px]'>The status of lead : {statusItem.businessname} </h2>

          <p className='text-[12px] sm:text-[16px] ' >
            We regret to inform you that the lead you submitted has not been converted. Detailed reasons have been communicated to you via email. Do not be disheartened. Persevere and keep trying. Your persistence will pay off..
          </p>
          </div>
        )}

</div>


          ))

        }


      </div>
    </div>
  );
}

export default Status;
