// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';

// interface Task {
//   id: number;
//   task_name: string;
//   task_description: string;
//   priority: string;
//   status: string;
// }

// const LoadTasks: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const navigate = useNavigate();

//   const username = localStorage.getItem('username') || 'User';

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         if (!id) {
//           console.error('User ID not found in localStorage');
//           return;
//         }

//         const response = await api.post('/api/task', { id });
//         const result: Task[] = response.data;
//         console.log('Fetched tasks:', result);
//         setTasks(result);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">Tasks for {username}</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//         >
//           Back
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 text-sm text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">S.No</th>
//               <th className="border px-4 py-2">Task Name</th>
//               <th className="border px-4 py-2">Description</th>
//               <th className="border px-4 py-2">Priority</th>
//               <th className="border px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length > 0 ? (
//               tasks.map((task, index) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2">{task.task_name}</td>
//                   <td className="border px-4 py-2">{task.task_description}</td>
//                   <td className="border px-4 py-2">{task.priority}</td>
//                   <td className="border px-4 py-2">{task.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-4">No tasks assigned.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LoadTasks;

