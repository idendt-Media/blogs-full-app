import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import HeaderDash from '../components/Header-D';

const ReferPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [leadId, setLeadId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = localStorage.getItem('userEmail');
        console.log('Stored Email:', storedEmail);

        setUserEmail(storedEmail);

        if (!storedEmail) {
          console.error('User email not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:5000/leads?email=${storedEmail}`);  // Use Axios here
        console.log('API Response:', response);

        if (!response.data || response.data.length === 0) {
          console.error('No lead data found.');
          return;
        }

        const data = response.data;
        console.log('Leads Data:', data);

        setLeadId(data[0]._id);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Stored Email in localStorage:', localStorage.getItem('userEmail'));

  return (
    <div className=' bg-black h-[100vh]'>
      <HeaderDash />

      <div className='flex flex-col gap-4 bg-black py-32 sm:py-10 px-10 sm:px-40 w-full' >
        <h1 className="text-[24px] sm:text-[60px] font-bold text-white">Refer and Earn</h1>

        <div className='flex flex-col sm:flex-row gap-2 w-full'>
          <Link to={leadId ? `/status/${leadId}` : "/lead-submit"}>
            <img src="assets\sales\leadsStatus.png" alt="" className='flex-1 w-full' />
          </Link>

          <Link to={"/lead-submit"}>
            <img src="assets\sales\leadsSubmit.png" alt="" className='flex-1 w-full' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferPage;
