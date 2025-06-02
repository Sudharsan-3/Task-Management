import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

interface Task {
  id: number;
  ticket: string; // ✅ added this
  user_name: string;
  task_name: string;
  task_description: string;
  user_comments?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'pending' | 'completed';
  eta?: string;
}

const LoadTasks: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username: string = localStorage.getItem('username') || 'User';
  const id: string | null = localStorage.getItem('id');

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchTasks = async () => {
    const res = await api.post('api/task', { id });
    return res.data;
  };

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user id', id],
    queryFn: fetchTasks,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data?.tasks) {
      toast.success('Tasks loaded successfully!');
      const tasks: Task[] = data.tasks;

      const hasIncompleteTasks = tasks.some((task) => {
        if (!task.eta || task.status.toLowerCase() === 'completed') return false;
        return new Date(task.eta) < new Date();
      });

      if (hasIncompleteTasks) {
        toast.error('Some users have missed their deadlines!');
      }
    }

    if (isError) {
      toast.error('Failed to fetch tasks!');
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleShow = (task: Task) => {
    navigate('/View-Task', { state: { task } });
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
      refetch();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTasks = data?.tasks?.filter((task: Task) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'incomplete'
        ? task.eta &&
          new Date(task.eta) < new Date() &&
          task.status.toLowerCase() !== 'completed'
        : task.status.toLowerCase() === filterStatus;

    const matchesSearch = task.ticket.toLowerCase().includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string ) => {
    if (!status) return 'text-gray-600';
    
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-800';
      case 'pending':
        return 'text-orange-600';
      case 'draft':
        return 'text-gray-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center justify-between mb-4 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-blue-600 hover:cursor-pointer"
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">
          Tasks for {username}
        </h2>

        <div className="flex items-center gap-2">
          <select
            className="border border-gray-300 text-sm p-2 rounded-md hover:cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <button
            onClick={() => navigate('/addTasks')}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
            title="Add Task"
          >
            Create Tasks
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ticket (e.g., TICK-DATE(020625)-001)..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {isLoading ? (
        <div className="text-center text-blue-600 font-semibold py-10">
          Loading tasks...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
               
                <th className="border px-4 py-2">Ticket</th>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Task Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.length > 0 ? (
                filteredTasks.map((task: Task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                   
                    <td className="border px-4 py-2 font-semibold text-blue-600">{task.ticket}</td>
                    <td className="border px-4 py-2">{task.user_name}</td>
                    <td className="border px-4 py-2">{task.task_name}</td>
                    <td className="border px-4 py-2 text-sm">
                      <p className="mb-1">{task.task_description}</p>
                      <p className="text-xs text-gray-500">
                        <strong>Note:</strong> {task.user_comments || '—'}
                      </p>
                      <p className="text-xs text-gray-500">
                        <strong>ETA:</strong>{' '}
                        {task.eta
                          ? new Date(task.eta).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            })
                          : '—'}
                      </p>
                    </td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="border px-4 py-2 capitalize  >{task.status}</td>
                    <td className="border px-4 py-2 text-center space-x-3 text-lg">
                      <button
                        onClick={() => handleShow(task)}
                        className="text-purple-600 hover:text-purple-800 hover:cursor-pointer"
                        title="Show"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleUpdate(task)}
                        className="text-yellow-600 hover:text-yellow-800 hover:cursor-pointer"
                        title="Update"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoadTasks;
