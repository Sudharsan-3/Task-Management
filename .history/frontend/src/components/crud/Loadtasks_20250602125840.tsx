import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const UserDashboard = () => {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUserTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tasks/user/${id}`);
      setData(res.data);
    } catch (error) {
      toast.error('Failed to fetch user tasks');
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const handleStatusUpdate = async (taskId, status, comments) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        status,
        user_comments: comments,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchUserTasks(); // Refresh data
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const filteredTasks = data?.tasks?.filter((task) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'incomplete'
        ? task.eta && new Date(task.eta) < new Date() && task.status.toLowerCase() !== 'completed'
        : task.status.toLowerCase() === filterStatus;

    const matchesSearch =
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toString().includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 mt-10 flex-wrap gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:cursor-pointer"
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <h2 className="text-2xl font-bold text-center flex-1">Tasks for {username}</h2>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by task name or ID"
            className="border border-gray-300 p-2 rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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
          >
            Create Tasks
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-1">{task.task_name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Description:</span> {task.task_description}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Priority:</span> {task.priority}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`font-semibold ${
                    task.status === 'completed'
                      ? 'text-green-600'
                      : task.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {task.status}
                </span>
              </p>

              {/* User comments section */}
              <div className="mt-2">
                <label htmlFor={`comments-${task.id}`} className="block text-sm font-medium">
                  Comments:
                </label>
                <textarea
                  id={`comments-${task.id}`}
                  defaultValue={task.user_comments}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  onChange={(e) => (task.user_comments = e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleStatusUpdate(task.id, 'completed', task.user_comments)}
                  className="bg-green-600 hover:bg-green-800 text-white px-4 py-1 rounded-md text-sm"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full mt-10">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaEye, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
// import api from '../../api/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useQuery } from '@tanstack/react-query';

// interface Task {
//   id: number;
//   user_name: string;
//   task_name: string;
//   task_description: string;
//   user_comments?: string;
//   priority: string;
//   status: string;
//   eta?: string;
// }

// const LoadTasks: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const username: string = localStorage.getItem('username') || 'User';
//   const id: string | null = localStorage.getItem('id');

//   const [filterStatus, setFilterStatus] = useState<string>('all');

//   const fetchTasks = async () => {
//     const res = await api.post('api/task', { id });
//     return res.data;
//   };

//   const {
//     data,
//     isLoading,
//     isSuccess,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ['user id', id],
//     queryFn: fetchTasks,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     if (isSuccess && data?.tasks) {
//       toast.success('Tasks loaded successfully!');

//       const tasks: Task[] = data.tasks;
//       const hasIncompleteTasks = tasks.some((task) => {
//         if (!task.eta || task.status.toLowerCase() === 'completed') return false;
//         return new Date(task.eta) < new Date();
//       });

//       if (hasIncompleteTasks) {
//         toast.error('Some users have missed their deadlines!');
//       }
//     }

//     if (isError) {
//       toast.error('Failed to fetch tasks!');
//     }
//   }, [isSuccess, isError, data]);

//   useEffect(() => {
//     if (location.state?.refetch) {
//       refetch();
//     }
//   }, [location.state, refetch]);

//   const handleShow = (task: Task) => {
//     navigate("/View-Task", { state: { task } });
//   };

//   const handleUpdate = (task: Task) => {
//     navigate(`/update-task/${task.id}`, { state: { task } });
//   };

//   const handleDelete = async (taskId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this task?');
//     if (!confirmDelete) return;

//     try {
//       await api.delete('/api/delete', { data: { id: taskId } });
//       toast.success('Task deleted successfully');
//       refetch();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       toast.error('Failed to delete task');
//     }
//   };

//   const filteredTasks = data?.tasks?.filter((task: Task) => {
//     if (filterStatus === 'all') return true;

//     if (filterStatus === 'incomplete') {
//       const now = new Date();
//       const etaDate = task.eta ? new Date(task.eta) : null;

//       return (
//         etaDate !== null &&
//         etaDate < now &&
//         task.status.toLowerCase() !== 'completed'
//       );
//     }

//     return task.status.toLowerCase() === filterStatus;
//   });

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="flex items-center justify-between mb-4 mt-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center mb-4 text-blue-600 hover:cursor-pointer"
//         >
//           <FaArrowLeft className="mr-2" />
//         </button>

//         <h2 className="text-2xl font-bold text-center flex-1">Tasks for {username}</h2>

//         <div className="flex items-center gap-2">
//           <select
//             className="border border-gray-300 text-sm p-2 rounded-md hover:cursor-pointer"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="draft">Draft</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="incomplete">Incomplete</option>
//           </select>

//           <button
//             onClick={() => navigate("/addTasks")}
//             className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
//             title="Add Task"
//           >
//             Create Tasks
//           </button>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="text-center text-blue-600 font-semibold py-10">Loading tasks...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border px-2 py-2 w-12 text-center">S.no</th>
//                 <th className="border px-4 py-2">User Name</th>
//                 <th className="border px-4 py-2">Task Name</th>
//                 <th className="border px-4 py-2">Description</th>
//                 <th className="border px-4 py-2">Priority</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTasks?.length > 0 ? (
//                 filteredTasks.map((task: Task, index: number) => (
//                   <tr key={task.id} className="hover:bg-gray-50">
//                     <td className="border px-2 py-2 text-center">{index + 1}</td>
//                     <td className="border px-4 py-2">{task.user_name}</td>
//                     <td className="border px-4 py-2">{task.task_name}</td>
//                     <td className="border px-4 py-2 text-sm">
//                       <p className="mb-1">{task.task_description}</p>
//                       <p className="text-xs text-gray-500">
//                         <strong>Note:</strong> {task.user_comments || '—'}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         <strong>ETA:</strong>{' '}
//                         {task.eta
//                           ? new Date(task.eta).toLocaleString('en-IN', {
//                               day: '2-digit',
//                               month: 'short',
//                               year: 'numeric',
//                               hour: 'numeric',
//                               minute: 'numeric',
//                               hour12: true,
//                             })
//                           : '—'}
//                       </p>
//                     </td>
//                     <td className="border px-4 py-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//                           ${
//                             task.priority === 'high'
//                               ? 'bg-red-100 text-red-700'
//                               : task.priority === 'medium'
//                               ? 'bg-yellow-100 text-yellow-700'
//                               : 'bg-green-100 text-green-700'
//                           }`}
//                       >
//                         {task.priority}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2 capitalize">{task.status}</td>
//                     <td className="border px-4 py-2 text-center space-x-3 text-lg">
//                       <button
//                         onClick={() => handleShow(task)}
//                         className="text-purple-600 hover:text-purple-800 hover:cursor-pointer"
//                         title="Show"
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         onClick={() => handleUpdate(task)}
//                         className="text-yellow-600 hover:text-yellow-800 hover:cursor-pointer"
//                         title="Update"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(task.id)}
//                         className="text-red-600 hover:text-red-800 hover:cursor-pointer"
//                         title="Delete"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="text-center py-4 text-gray-500">
//                     No tasks found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoadTasks;

