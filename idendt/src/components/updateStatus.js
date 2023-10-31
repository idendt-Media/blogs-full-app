import React, { useState, useEffect } from 'react';
import HeaderDash from '../components/Header-D';
import axios from 'axios';
function UpdateStatus() {
    const [data, setData] = useState([]);
      const [showFirst, setShowFirst] = useState(null);
    //   const [status, setStatus] = useState();


        const handleToggle = (leadId) => {
    setShowFirst(null);
    updateStatusOnBackend(leadId, null);
  };

  const handleShowSecond = (leadId) => {
    setShowFirst(true);
    updateStatusOnBackend(leadId, 'converted');
  };

  const handleShowThird = (leadId) => {
    setShowFirst(false);
    updateStatusOnBackend(leadId, 'not-converted');
  };


    useEffect(() => {
      async function fetchSubmittedData() {
        try {
          const response = await axios.get('http://localhost:5000/submited-data');
          setData(response.data);
          
         
          console.log(response.data ,"data mon");
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchSubmittedData();
    }, [handleShowSecond]);


    
  const updateStatusOnBackend = async (leadId, newStatus) => {
    try {
      await axios.post(`http://localhost:5000/update-lead-status/${leadId}`, { newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
      // Set state to handle the error
    }
  };


  
    return (
      <div>
        <HeaderDash />
  
        <div className="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">
          <h1 className="text-[24px] sm:text-[60px] font-bold text-white">Submitted Leads</h1>
  
          {data.map((items, index) => (
  <div key={index}>
    <h1 className="text-white">No : {index + 1}</h1>
    <h1 className="text-white">Business Name: {items.businessname}</h1>
    <h1 className="text-white">Status: {items.status}</h1>

    <div className='flex justify-start items-center gap-8 py-5'>
      <button
        className={`text-black h-10 w-20 rounded-xl ${items.status === null ?  'bg-yellow-500' : 'bg-white'}`}
        onClick={() => handleToggle(items._id)}
      >
        Pending
      </button>

           <button
        className={`text-black h-10 w-32 rounded-xl ${items.status === 'converted' ?  'bg-green-500': 'bg-white'}`}
        onClick={() => handleShowSecond(items._id)}
      >
        Converted
      </button>
      <button
        className={`text-black h-10 w-32 rounded-xl  ${items.status === 'not-converted' ? 'bg-red-500' : 'bg-white'}`}
        onClick={() => handleShowThird(items._id)}
      >
        Not-Converted
      </button>
 
    </div>
  </div>
))}


        </div>
      </div>
    );
}

export default UpdateStatus
