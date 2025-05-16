// import React, { useContext, useEffect, useState } from 'react';
// import { FaEye } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// const Getallusers: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [notification, setNotification] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   if (typeof user === 'string') {
//     axios.defaults.headers.common["Authorization"] = user;
//   }

//   const handleShow = (user: User) => {
//     alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
      
//       try {
//         const response = await api.get<User[]>('/api/allUsers');
//         setUsers(response.data);
//         setNotification(`Successfully loaded ${response.data.length} users`);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//         setNotification('Error fetching users');

//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//         >
//           Back
//         </button>
//         <h2 className="text-2xl font-bold text-right">All Users</h2>
//       </div>

//       {notification && (
//         <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded shadow text-center">
//           {notification}
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 text-sm text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">S.No</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Role</th>
//               <th className="border px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user, index) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2">{user.name}</td>
//                   <td className="border px-4 py-2">{user.email}</td>
//                   <td className="border px-4 py-2 capitalize">{user.role}</td>
//                   <td className="border px-4 py-2 text-center text-lg">
//                     <button
//                       onClick={() => handleShow(user)}
//                       className="text-purple-600 hover:text-purple-800"
//                       title="Show"
//                     >
//                       <FaEye />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center text-gray-500 py-4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Getallusers;
