import React, { useState, useEffect } from 'react';
import HeaderDash from '../components/Header-D';
import axios from 'axios';
import { Link } from 'react-router-dom'


function StatusCheck() {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div>
      <HeaderDash />

      <div className="form-header bg-black px-10 sm:px-14 lg:px-40 flex flex-col gap-6">
        <h1 className="text-[24px] sm:text-[60px] font-bold text-white">Submitted Leads</h1>

        {data.map((items, index) => (
          <div key={index}>
            <h1 className="text-white">Index: {index +1}</h1>
            <h1 className="text-white">Business Name: {items.businessname}</h1>

            <Link to={`/status/${items._id}`}>

            <button className="text-white">check status</button>

</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusCheck;
