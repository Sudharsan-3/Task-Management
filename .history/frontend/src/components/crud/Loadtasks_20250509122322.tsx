

// import React, { useEffect, useState } from 'react';
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
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">S.No</th>
//             <th className="border px-4 py-2">Task Name</th>
//             <th className="border px-4 py-2">Task Description</th>
//             <th className="border px-4 py-2">Priority</th>
//             <th className="border px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length > 0 ? (
//             tasks.map((task, index) => (
//               <tr key={task.id}>
//                 <td className="border px-4 py-2">{index + 1}</td>
//                 <td className="border px-4 py-2">{task.task_name}</td>
//                 <td className="border px-4 py-2">{task.task_description}</td>
//                 <td className="border px-4 py-2">{task.priority}</td>
//                 <td className="border px-4 py-2">{task.status}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={5} className="text-center py-4">No tasks assigned.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LoadTasks;

