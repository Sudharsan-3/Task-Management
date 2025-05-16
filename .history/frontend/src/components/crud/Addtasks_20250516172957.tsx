import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'User';
  const id = localStorage.getItem('id');

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
    if (isLoading) {
      toast.loading('Fetching tasks...', { toastId: 'fetching' });
    }
    if (isSuccess) {
      toast.dismiss('fetching');
      toast.success('Tasks loaded successfully!');
    }
    if (isError) {
      toast.dismiss('fetching');
      toast.error('Failed to fetch tasks!');
    }
  }, [isLoading, isSuccess, isError]);

  // ✅ Trigger refetch if coming from create task
  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleShow = (task: Task) => {
    alert(
      `Task Details:\n\nName: ${task.task_name}\nDescription: ${task.task_description}\nPriority: ${task.priority}\nStatus: ${task.status}`
    );
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
      refetch(); // update after deletion
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
          className="mb-4 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          ←
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">
          Tasks for {username}
        </h2>

        <button
          onClick={() => navigate("/addTasks")}
          className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
          title="Add Task"
        >
          Create tasks
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
            {data?.tasks?.length > 0 ? (
              data.tasks.map((task: Task, index: number) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{task.user_name}</td>
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                        ${
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
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No tasks assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadTasks;


// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from '../Context/AuthContext';
// import { useQuery } from '@tanstack/react-query';

// interface User {
//   id: number;
//   name: string;
// }

// const CreateTask: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [priority, setPriority] = useState('medium');
//   const [status, setStatus] = useState('draft');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const creatorId = user?.id;
//   const creator_name = user?.name;

//   // Fetch all users for assigning the task
//   const fetchData = async () => {
//     const res = await api.get('/api/allUsers');
//     return res.data;
//   };

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ['addTasks', user],
//     queryFn: fetchData,
//     enabled: !!user, // only run if user is defined
//   });

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading('Fetching users...', { toastId: 'fetching-users' });
//     } else {
//       toast.dismiss('fetching-users');
//     }

//     if (isSuccess) {
//       setUsers(data.users || []);
//       toast.success('Users loaded successfully');
//     }

//     if (isError) {
//       toast.error('Failed to fetch users');
//     }
//   }, [data, isLoading, isSuccess, isError]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedUserId || !creatorId) {
//       toast.error('Please select both user and creator');
//       return;
//     }

//     const selectedUser = users.find((u) => u.id.toString() === selectedUserId);
//     const userName = selectedUser?.name || '';

//     setLoading(true);
//     try {
//       const response = await api.post('/api/createTask', {
//         user_id: Number(selectedUserId),
//         user_name: userName,
//         creator_id: Number(creatorId),
//         task_name: taskName,
//         task_description: taskDescription,
//         priority,
//         status,
//         creator_name,
//       });

//       if (!response) throw new Error('No response from server');
//       toast.success('✅ Task created successfully!');

//       setTaskName('');
//       setTaskDescription('');
//       setPriority('medium');
//       setStatus('draft');
//       setSelectedUserId('');
//       setMessage(null);

//       navigate("/tasks", { state: { refetch: true } });


//     } catch (err: any) {
//       setMessage(err.message || 'Error occurred');
//       toast.error('Something went wrong while creating task.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
//       >
//         ← Back
//       </button>

//       <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>

//       {message && (
//         <div className="mb-4 text-center text-sm text-red-600">{message}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Select User</label>
//           <select
//             required
//             value={selectedUserId}
//             onChange={(e) => setSelectedUserId(e.target.value)}
//             className="w-full border rounded-md px-4 py-2"
//           >
//             <option value="">-- Select User --</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id.toString()}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Task Name</label>
//           <input
//             type="text"
//             required
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//             className="w-full border rounded-md px-4 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Description</label>
//           <textarea
//             required
//             value={taskDescription}
//             onChange={(e) => setTaskDescription(e.target.value)}
//             className="w-full border rounded-md px-4 py-2"
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block font-medium text-gray-700 mb-1">Priority</label>
//             <select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               className="w-full border rounded-md px-4 py-2"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>

//           <div className="flex-1">
//             <label className="block font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full border rounded-md px-4 py-2"
//             >
//               <option value="draft">Draft</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//         >
//           {loading ? 'Creating...' : 'Create Task'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTask;
