import React, { useState, useEffect} from 'react';
import axios from 'axios';
import baseUrl from './config'; // Adjust the path accordingly


function DeleteJobs() {



    const [jobPosts, setJobPosts] = useState([]);

    

// Delete API 
useEffect(() => {
    async function fetchJobsPosts() {
      try {
        const response = await axios.get(`${baseUrl}/api/job`);
        setJobPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }


    fetchJobsPosts();
  }, []); 



  async function handleDeleteJobPost(jobId) {
    // Display a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this job post?');

    if (!confirmed) {
        // The user clicked "Cancel" in the confirmation dialog, so we don't proceed with the deletion.
        return;
    }

    try {
        const response = await fetch(`https://idendt-db.onrender.com/api/job/${jobId}`, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            // Job post deleted successfully
            // You can update your UI or perform any other actions here
            console.log('Job post deleted successfully');
        } else if (response.status === 404) {
            // Job post not found
            console.log('Job post not found');
        } else {
            // Handle other errors
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
















  return (
    <div>
      <div>
<h1 className="text-white text-[30px] lg:text-[40px] px-40 py-12">Openings currently Listed</h1>



    {jobPosts.map(job=> {
    return(

    <div key={job._id} className=' w-full- flex justify-center py-5'>

        <div className='flex justify-between gap-12 items-baseline min-w-[500px] '>



<div className='flex-col justify-center items-center gap-10'>

        <h1 className='text-white capitalize'>{job.title}</h1>
        {/* <p>{job.desc}</p> */}

</div>
        <div>
            <button  onClick={() => handleDeleteJobPost(job._id)} className='bg-red-500 text-white w-[120px] h-[40px] rounded-lg  '>Delete</button>
        </div>
        </div>
    </div>
    )
    
  })
  
}
  </div>
    </div>
  )
}

export default DeleteJobs
