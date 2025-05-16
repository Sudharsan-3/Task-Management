import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

interface Task {
  id: number;
  user_name: string;
  task_name: string;
  task_description: string;
  priority: string;
  status: string;
}

const LoadTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const id = localStorage.getItem('id');
  const featchdata = async()=>{

    const res = await api.post('api/task',{id})
    return res.data
  }
  const {data,isLoading,isSuccess,isError} = useQuery({
    queryKey:["user id",id],
    queryFn:featchdata,
  });
   useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching tasks...", { toastId: "fetching" });
    }
    if (isSuccess) {
      toast.dismiss("fetching");
      toast.success("Tasks loaded successfully!");
      setTasks(data)
    }
    if (isError) {
      toast.dismiss("fetching");
      toast.error("Failed to fetch tasks!");
    }
  }, [isLoading, isSuccess, isError]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
       
  //       if (!id) {
  //         toast.error('User ID not found in localStorage');
  //         return;
  //       }

  //       const response = await api.post('/api/task', { id });
  //       console.log("API Response:", response.data);
  //       console.log(response.data.tasks)

  //       if (Array.isArray(response.data.tasks)) {
  //         setTasks(response.data.tasks);
  //         toast.success("Tasks loaded successfully")
  //       } else {
  //         toast.error('Unexpected response format from server');
  //         setTasks([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //       toast.error('Failed to fetch tasks from server');
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const handleShow = (task: Task) => {
    alert(`Task Details:\n\nName: ${task.task_name}\nDescription: ${task.task_description}\nPriority: ${task.priority}\nStatus: ${task.status}`);
  };

  const handleUpdate = (task: Task) => {
    navigate(`/update-task/${task.id}`, { state: { task } });
  };

  const handleDelete = async (taskId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await api.delete('/api/delete', { data: { id: taskId } });
      toast.success('Task deleted successfully');
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Back
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">
          Tasks for {username}
        </h2>

        <button
          onClick={() => navigate("/addTasks")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
          title="Add Task"
        >
          +
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Task Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Priority</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{task.user_name}</td>
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2 capitalize">{task.priority}</td>
                  <td className="border px-4 py-2 capitalize">{task.status}</td>
                  <td className="border px-4 py-2 text-center space-x-3 text-lg">
                    <button
                      onClick={() => handleShow(task)}
                      className="text-purple-600 hover:text-purple-800 cursor-pointer"
                      title="Show"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUpdate(task)}
                      className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">No tasks assigned.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadTasks;
