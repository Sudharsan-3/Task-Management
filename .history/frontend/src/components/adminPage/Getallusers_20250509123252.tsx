

// import React, { useEffect } from 'react';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import api from '../../api/axios';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }



// interface Props {
//   value: User[];
// }

// const Getallusers: React.FC<Props> = ({ value }) => {
//   const [rData, setRdata] = useState<User[] | null>(null);
//     const [notification, setNotification] = useState<string | null>(null);
  
//   const handleShow = (user: User) => {
//     console.log('Showing user:', user);
//   };

//   const handleEdit = (user: User) => {
//     console.log('Editing user:', user);
//   };

//   const handleDelete = (userId: number) => {
//     console.log('Deleting user with ID:', userId);
//   };
//   useEffect(()=>{
//       const featch = async ()=>{
//         try {
//        const response = await api.get<User[]>("/api/allUsers");
//        const users = response.data;
//        setRdata(users);
//        setNotification(`Successfully loaded ${users.length} users`);
//      } catch (error) {
//        console.error("Failed to fetch users:", error);
//        setNotification("Error fetching users");
//      }
//      } ;
//       featch()
  
//     },[])

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6 flex items-start justify-center">
//       <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Users</h2>
//         <table className="w-full table-auto border-collapse">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-800">
//               <th className="p-4 text-left">No.</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {value.length > 0 ? (
//               value.map((user, index) => (
//                 <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
//                   <td className="p-4">{index + 1}</td>
//                   <td className="p-4">{user.name}</td>
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4 capitalize">{user.role}</td>
//                   <td className="p-4 flex justify-center gap-4 text-lg">
//                     <button
//                       onClick={() => handleShow(user)}
//                       className="text-purple-600 hover:text-purple-800"
//                       title="Show"
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="text-yellow-600 hover:text-yellow-800"
//                       title="Edit"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center text-gray-500 py-6">
//                   No users found
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

