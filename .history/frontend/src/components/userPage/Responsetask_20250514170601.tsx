import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const Responsetask = () => {
  const location = useLocation();
  const id = location.state;

  const fetchData = async () => {
    const res = await api.patch("api/Usergettask", { id });
    return res.data;
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["userTaskDetails", id],
    queryFn: fetchData,
  });

  const task = data?.tasks;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Your Task Details</h1>

      {isLoading && <p>Loading task details...</p>}
      {isError && <p className="text-red-500">Error fetching task details.</p>}

      {isSuccess && task && (
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-xl mx-auto">
          <p><strong>Task Name:</strong> {task.task_name}</p>
          <p><strong>Description:</strong> {task.task_description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}</p>
          <p><strong>User Name:</strong> {task.user_name}</p>
        </div>
      )}
    </div>
  );
};

export default Responsetask;


// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { useLocation } from 'react-router-dom';
// import api from '../../api/axios';
// import { ToastContainer,toast } from 'react-toastify';

// const Responsetask = () => {
//     const location = useLocation();
//   const id = location.state; 

//   const fetchData = async()=>{
//         const res = await api.patch("api/Usergettask",{id});
//         return res.data
//   }

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ["userTasks", id],
//     queryFn: fetchData,
//   });
//   const datastr = JSON.stringify(data)

//   console.log(datastr,"from Responsetask")
//   return (
//     <div>
//         <ToastContainer position='top-right' autoClose={3000} />
//         <h1>hi</h1>
        
      
//     </div>
//   )
// }

// export default Responsetask
