import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface Task {
  id: number;
  task_name: string;
  task_description: string;
  priority: string;
  status: string;
}

const Status: React.FC = () => {
  const [status, setStatus] = useState<string>('All');
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async (selectedStatus: string) => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) return console.error('User ID not found');

      let response;

      if (selectedStatus === 'All') {
        response = await api.post('/api/task', { id: userId });
      } else {
        response = await api.post('/api/task/filter', {
          user_id: userId,
          status: selectedStatus,
        });
      }

      setStatus(selectedStatus);
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tasks Filtered by Status: <span className="text-indigo-600">{status}</span></h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => fetchTasks('All')}
            className={`py-2 px-4 rounded font-semibold ${
              status === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => fetchTasks('Draft')}
            className={`py-2 px-4 rounded font-semibold ${
              status === 'Draft' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Draft
          </button>
          <button
            onClick={() => fetchTasks('Completed')}
            className={`py-2 px-4 rounded font-semibold ${
              status === 'Completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Task Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{task.task_name}</td>
                    <td className="border px-4 py-2">{task.task_description}</td>
                    <td className="border px-4 py-2">{task.priority}</td>
                    <td className="border px-4 py-2">{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No tasks available for selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;
