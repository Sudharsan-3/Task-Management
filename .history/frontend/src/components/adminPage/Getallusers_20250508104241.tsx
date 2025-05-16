import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  value: User[];
}

const Getallusers: React.FC<Props> = ({ value }) => {
  const handleShow = (user: User) => {
    console.log('Showing user:', user);
  };

  const handleEdit = (user: User) => {
    console.log('Editing user:', user);
  };

  const handleDelete = (userId: number) => {
    console.log('Deleting user with ID:', userId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex items-start justify-center">
      <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Users</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="p-4 text-left">No.</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {value.length > 0 ? (
              value.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 flex justify-center gap-4 text-lg">
                    <button
                      onClick={() => handleShow(user)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Show"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Getallusers;



// import {  FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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
  

//   const handleShow = (user: User) => {
//     console.log('Showing user:', user);
//   };

//   const handleEdit = (user: User) => {
//     console.log('Editing user:', user);
//   };

//   const handleDelete = (userId: number) => {
//     console.log('Deleting user with ID:', userId);
//   };

  

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
//       <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>
//         <table className="w-full table-auto border-collapse text-left">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="p-3">No.</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {value.map((user, index) => (
//               <tr key={user.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3 capitalize">{user.role}</td>
//                 <td className="p-3 flex gap-3 justify-center">
                 
//                   <button
//                     onClick={() => handleShow(user)}
//                     className="text-purple-600 hover:text-purple-800"
//                     title="Show"
//                   >
//                     <FaEye />
//                   </button>
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="text-yellow-600 hover:text-yellow-800"
//                     title="Edit"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Delete"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {value.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center text-gray-500 py-4">
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
