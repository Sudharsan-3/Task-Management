import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

interface Task {
  id: number;
  ticket: string;
  task_name: string;
  task_description: string;
  user_comments?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'pending' | 'completed';
  eta?: string;
}

const User: React.FC = () => {
  const navigate = useNavigate();
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
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userTasks', id],
    queryFn: fetchTasks,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data?.tasks) {
      const tasks: Task[] = data.tasks;

      const hasIncompleteTasks = tasks.some(
        (task) =>
          task.eta &&
          new Date(task.eta) < new Date() &&
          task.status.toLowerCase() !== 'completed'
      );

      if (hasIncompleteTasks) {
        toast.warning('You have tasks that are incomplete!');
      }
    }

    if (isError) {
      toast.error('Failed to fetch your tasks!');
    }
  }, [isSuccess, isError, data]);

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

  const handleView = (task: Task) => {
    navigate('/View-Task', { state: { task } });
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Welcome, {username}</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <input
          type="text"
          placeholder="Search by ticket..."
          onChange={handleSearchChange}
          className="p-2 border rounded flex-1"
        />
      </div>

      {filteredTasks?.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Ticket</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Priority</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">ETA</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.map((task:string|any, <index:number></index:number>|any) => (
                <tr key={task.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{task.ticket}</td>
                  <td className="p-2 border">{task.task_name}</td>
                  <td className="p-2 border">{task.task_description}</td>
                  <td className="p-2 border capitalize">{task.priority}</td>
                  <td className="p-2 border capitalize">{task.status}</td>
                  <td className="p-2 border">
                    {task.eta ? new Date(task.eta).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleView(task)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;

// import { useQuery } from "@tanstack/react-query";
// import api from "../../api/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect, useState, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye } from "lucide-react";

// const User = () => {
//   const id = localStorage.getItem("id") as string;
//   const navigate = useNavigate();

//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchUser = async () => {
//     const res = await api.post("/api/Usertasks", { id });
//     return res;
//   };

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ["userTasks", id],
//     queryFn: fetchUser,
//   });

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Fetching tasks...", { toastId: "fetching" });
//     }
//     if (isSuccess) {
//       toast.dismiss("fetching");
//       toast.success("Tasks loaded successfully!");
//     }
//     if (isError) {
//       toast.dismiss("fetching");
//       toast.error("Failed to fetch tasks!");
//     }
//   }, [isLoading, isSuccess, isError]);

//   const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setFilterStatus(e.target.value);
//   };

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredTasks = data?.data?.tasks?.filter((task: any) => {
//     const status = task.status.toLowerCase();
//     const eta = task.eta ? new Date(task.eta) : null;
//     const now = new Date();

//     const matchesStatus =
//       filterStatus === "all"
//         ? true
//         : filterStatus === "incomplete"
//         ? eta && eta < now && status !== "completed"
//         : status === filterStatus;

//     const matchesSearch = task.ticket?.toLowerCase().includes(searchQuery);

//     return matchesStatus && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-white p-4 sm:p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
//         Tasks Page
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
//         <div className="flex items-center gap-2">
//           <label className="text-black font-medium">Filter by Status:</label>
//           <select
//             value={filterStatus}
//             onChange={handleFilterChange}
//             className="border border-gray-300 rounded px-2 py-1"
//           >
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="incomplete">Incomplete</option>
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Search by Ticket (TICK-...)"
//           className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>

//       {/* Task Table */}
//       {filteredTasks?.length > 0 ? (
//         <div className="overflow-auto border border-gray-300 rounded-md">
//           <table className="min-w-full text-sm text-black border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 text-left w-5">S.No</th>
//                 <th className="border px-4 py-2 text-left">Creator Name</th>
//                 <th className="border px-4 py-2 text-left">Task Name</th>
//                 <th className="border px-4 py-2 text-left">Description</th>
//                 <th className="border px-4 py-2 text-left">Priority</th>
//                 <th className="border px-4 py-2 text-left">Status</th>
//                 <th className="border px-4 py-2 text-left">Ticket</th>
//                 <th className="border px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTasks.map((task: any, index: number) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2 capitalize">{task.creator_name}</td>
//                   <td className="border px-4 py-2">{task.task_name}</td>
//                   <td className="border px-4 py-2">{task.task_description}</td>
//                   <td className="border px-4 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//                       ${
//                         task.priority === "high"
//                           ? "bg-red-100 text-red-700"
//                           : task.priority === "medium"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {task.priority}
//                     </span>
//                   </td>
//                   <td className="border px-4 py-2 capitalize">{task.status}</td>
//                   <td className="border px-4 py-2 text-xs">{task.ticket}</td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => navigate("/reponsetask", { state: task.id })}
//                       className="flex items-center gap-1 text-blue-600 hover:underline hover:cursor-pointer"
//                       title="Respond to Task"
//                     >
//                       <Eye size={18} />
//                       Update
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-base sm:text-lg">
//           No tasks found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default User;

