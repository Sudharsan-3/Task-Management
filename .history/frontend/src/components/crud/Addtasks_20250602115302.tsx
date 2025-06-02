import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
}

const CreateTask: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const creatorId = user?.id;
  const creator_name = user?.name;

  // Fetch all users for assigning the task
  const fetchData = async () => {
    const res = await api.get('/api/allUsers');
    return res.data;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['addTasks', user],
    queryFn: fetchData,
    enabled: !!user, // only run if user is defined
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading('Fetching users...', { toastId: 'fetching-users' });
    } else {
      toast.dismiss('fetching-users');
    }

    if (isSuccess) {
      const valuess = data.users.filter((e:any)=>e.role === "user")
    
      console.log(data.users,"from tasks")
      setUsers(valuess || []);
      toast.success('Users loaded successfully');
    }

    if (isError) {
      toast.error('Failed to fetch users');
    }
  }, [data, isLoading, isSuccess, isError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || !creatorId) {
      toast.error('Please select both user and creator');
      return;
    }

    const selectedUser = users.find((u) => u.id.toString() === selectedUserId);
    const userName = selectedUser?.name || '';

    setLoading(true);
    try {
      const response = await api.post('/api/createTask', {
        user_id: Number(selectedUserId),
        user_name: userName,
        creator_id: Number(creatorId),
        task_name: taskName,
        task_description: taskDescription,
        priority,
        status,
        creator_name,
      });

      if (!response) throw new Error('No response from server');
      toast.success('✅ Task created successfully!');

      setTaskName('');
      setTaskDescription('');
      setPriority('medium');
      setStatus('draft');
      setSelectedUserId('');
      setMessage(null);

      navigate("/tasks", { state: { refetch: true } });


    } catch (err: any) {
      setMessage(err.message || 'Error occurred');
      toast.error('Something went wrong while creating task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      

      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:cursor-pointer"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-red-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex  flex-col">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Select User</label>
          <select
            required
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full border rounded-md px-4 py-2 hover:cursor-pointer"
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Task Name</label>
          <input
            type="text"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-md px-4 py-2 hover:cursor-pointer"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-4 py-2 hover:cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="draft">Draft</option>
              
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
