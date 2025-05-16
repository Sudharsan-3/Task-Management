import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Responsetask = () => {
  const location = useLocation();
  const id = location.state;

  const fetchData = async () => {
    const res = await api.patch("api/Usergettask", { id });
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchData,
  });

  const task = data?.tasks;

  // Local state for editable fields
  const [description, setDescription] = useState(task?.user_comments || "");
  const [status, setStatus] = useState(task?.status || "draft");

  const handleSubmit = async () => {
    try {
      if (!description || !status) {
        toast.error("Please provide both description and status");
        return;
      }

      await api.put("/api/UpdateuserTask", {
        id: task.id,
        user_comments: description,
        status,
      });

      toast.success("Response submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit response");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !task) {
    return <p className="text-center mt-10 text-red-500">Error loading task.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Respond to Task
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">User Name</label>
          <input
            type="text"
            value={task.user_name}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Task Name</label>
          <input
            type="text"
            value={task.task_name}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Task Description</label>
          <textarea
            value={task.task_description}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Priority</label>
          <input
            type="text"
            value={task.priority}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Your Description</label>
          <textarea
            placeholder="Add your response"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default Responsetask;

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useLocation } from 'react-router-dom';
// import api from '../../api/axios';
// import { ToastContainer, toast } from 'react-toastify';

// const Responsetask = () => {
//   const location = useLocation();
//   const id = location.state;

//   const fetchData = async () => {
//     const res = await api.patch("api/Usergettask", { id });
//     return res.data;
//   };

//   const { data, isLoading, isError, isSuccess } = useQuery({
//     queryKey: ["userTaskDetails", id],
//     queryFn: fetchData,
//   });

//   const task = data?.tasks;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-2xl font-bold mb-4 text-indigo-700">Your Task Details</h1>

//       {isLoading && <p>Loading task details...</p>}
//       {isError && <p className="text-red-500">Error fetching task details.</p>}

//       {isSuccess && task && (
//         <div className="bg-white shadow rounded-lg p-6 w-full max-w-xl mx-auto">
//           <p><strong>Task Name:</strong> {task.task_name}</p>
//           <p><strong>Description:</strong> {task.task_description}</p>
//           <p><strong>Priority:</strong> {task.priority}</p>
//           <p><strong>Status:</strong> {task.status}</p>
//           <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleString()}</p>
//           <p><strong>User Name:</strong> {task.user_name}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Responsetask;


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
