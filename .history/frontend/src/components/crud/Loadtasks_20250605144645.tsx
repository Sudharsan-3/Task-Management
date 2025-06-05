import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Task {
  id: number;
  ticket: string;
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
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  // Toast flags to avoid duplicate messages
  const hasShownSuccess = useRef(false);
  const hasShownDeadlineError = useRef(false);

  const fetchTasks = async () => {
    const res = await api.post('api/task', { id });
    return res.data;
  };
  const handleFilterDate = (date:any) => {
    setFilterDate(date);
  };


  const {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user_tasks', id],
    queryFn: fetchTasks,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Show toast once when data is successfully loaded
  useEffect(() => {
    if (isSuccess && data?.tasks && !hasShownSuccess.current) {
      toast.success('Tasks loaded successfully!');
      hasShownSuccess.current = true;

      const hasMissed = data.tasks.some((task: Task) => {
        return task.eta && task.status !== 'completed' && new Date(task.eta) < new Date();
      });

      if (hasMissed && !hasShownDeadlineError.current) {
        toast.error('Some users have missed their deadlines!');
        hasShownDeadlineError.current = true;
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

  const handleShow = (task: Task) => navigate('/View-Task', { state: { task } });
  const handleUpdate = (task: Task) => navigate(`/update-task/${task.id}`, { state: { task } });

  const handleDelete = async (taskId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await api.delete('/api/delete', { data: { id: taskId } });
      toast.success('Task deleted successfully');
      refetch();
      hasShownSuccess.current = false;
      hasShownDeadlineError.current = false;
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // const handleFilterDate = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFilterDate(e.target.value);
  // };

  const filteredTasks = data?.tasks?.filter((task: Task) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'incomplete'
        ? task.eta &&
          new Date(task.eta) < new Date() &&
          task.status.toLowerCase() !== 'completed'
        : task.status.toLowerCase() === filterStatus;

    const matchesPriority = filterPriority === 'all' ? true : task.priority === filterPriority;
    const matchesDate =
      !filterDate || (task.eta && new Date(task.eta).toISOString().slice(0, 10) === filterDate.toISOString().slice(0, 10));

    const matchesSearch = task.ticket.toLowerCase().includes(searchQuery);

    return matchesStatus && matchesPriority && matchesDate && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-800 text-white';
      case 'pending':
        return 'bg-orange-600 text-white';
      case 'draft':
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    {isLoading ? (
      <div className="text-center text-blue-600 font-semibold py-10">
        Loading tasks...
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <div
              key={task.id}
              className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{task.task_name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
    
              <p className="text-sm text-gray-600 mb-1">
                <strong>Ticket:</strong> {task.ticket}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>User:</strong> {task.user_name}
              </p>
    
              <div className="mt-2 flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
    
                <div className="flex space-x-3 text-lg">
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-4">
            No tasks found.
          </div>
        )}
      </div>
    )}
    
  
  );
};

export default LoadTasks;
