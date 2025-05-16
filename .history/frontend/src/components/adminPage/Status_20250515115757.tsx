import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/AuthContext';

interface Task {
  id: number;
  user_name: string;
  task_name: string;
  task_description: string;
  priority: string;
  status: string;
}

const Status: React.FC = () => {
  const [status, setStatus] = useState<string>('All');
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const value = user
  console.log(value?.id,"from status")

  const featchData = async ()=>{
    const res = await api.post("/api/task",{id:user?.id});
    return res;
  }

  const {data,isLoading,isSuccess,isError} = useQ

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          toast.error('User ID not found in localStorage');
          return;
        }

        const response = await api.post('/api/task', { id: user?.id });
        console.log(response.data.tasks)

        if (!Array.isArray(response.data.tasks)) {
          toast.error('Invalid response from server');
          return;
        }
        toast.success("Task status loaded successfully")
        setAllTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        toast.error('Failed to fetch tasks');
      }
    };

    fetchAllTasks();
  }, []);

  const handleStatusFilter = (selectedStatus: string) => {
    setStatus(selectedStatus);

    if (selectedStatus === 'All') {
      setFilteredTasks(allTasks);
    } else {
      const filtered = allTasks.filter(task => task.status.toLowerCase() === selectedStatus.toLowerCase());
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto  rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 ml-auto">
            Tasks Filtered by Status: <span className="text-indigo-600">{status}</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {['All', 'Draft', 'Completed'].map((stat) => (
            <button
              key={stat}
              onClick={() => handleStatusFilter(stat)}
              className={`py-2 px-4 rounded font-semibold ${
                status === stat ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Task Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{task.user_name}</td>
                    <td className="border px-4 py-2">{task.task_name}</td>
                    <td className="border px-4 py-2">{task.task_description}</td>
                    <td className="border px-4 py-2 capitalize">{task.priority}</td>
                    <td className="border px-4 py-2 capitalize">{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
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

