import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FaArrowLeft } from 'react-icons/fa';

const Edittasks: React.FC = () => {
  const location = useLocation();
  const { task } = location.state;
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState(task.task_name);
  const [taskDescription, setTaskDescription] = useState(task.task_description);
  const [priority, setPriority] = useState(task.priority);
  const [successMessage, setSuccessMessage] = useState('');
  const id = task.id

  const updateUserData = async () => {
    try {
        await api.patch(`/api/editTasks/${task.id}`, {
            id,
            task_name: taskName,
            task_description: taskDescription,
            priority,
          });
          

      setSuccessMessage('Task updated successfully!');
      setTimeout(() => {
        navigate('/tasks'); // navigate back to task list after update
      }, 2000); // wait 2 seconds before navigating
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
      <div className="flex justify-between  mb-4">
              <button
                      onClick={() => navigate(-1)}
                      className="flex items-center mb-4 text-blue-600 hover:underline"
                    >
                      <FaArrowLeft className="mr-2" />
                    </button>
              
            </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-semibold">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-semibold">Task Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring focus:ring-indigo-300"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-semibold">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            ← 
          </button>
          <button
            onClick={updateUserData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edittasks;
