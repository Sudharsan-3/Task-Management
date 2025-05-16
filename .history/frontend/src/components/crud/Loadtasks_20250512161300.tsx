import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';

interface Task {
  id: number;
  task_name: string;
  task_description: string;
  priority: string;
  status: string;
}

const LoadTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const id = localStorage.getItem('id');
        if (!id) {
          console.error('User ID not found in localStorage');
          return;
        }

        const response = await api.post('/api/task', { id });
        const result: Task[] = response.data;
        setTasks(result);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleShow = (task: Task) => {
    alert(`Task Details:\n\nName: ${task.task_name}\nDescription: ${task.task_description}\nPriority: ${task.priority}\nStatus: ${task.status}`);
  };

  const handleUpdate = (task: Task) => {
    navigate(`/update-task/${task.id}`, { state: { task } }); // Adjust route as per your app
  };

  const handleDelete = async (taskId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    console.error
    if (!confirm) return;

    try {
      await api.delete(`/api/task/${taskId}`);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
  <button
    onClick={() => navigate(-1)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
  >
    Back
  </button>
  <h2 className="text-2xl font-bold ml-auto">Tasks for {username}</h2>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">S.No</th>
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
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2 capitalize">{task.priority}</td>
                  <td className="border px-4 py-2 capitalize">{task.status}</td>
                  <td className="border px-4 py-2 text-center space-x-3 text-lg">
                    <button
                      onClick={() => handleShow(task)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Show"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUpdate(task)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No tasks assigned.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadTasks;


