import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../Context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthUser {
  token: string;
}

const Getallusers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as { user: AuthUser | null };

  const handleShow = (user: User) => {
    alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !user.token) {
        setNotification('User is not authenticated.');
        return;
      }

      try {
        const response = await api.get<User[]>('/api/allUsers', {
          headers: {
            Authorization: }, // Directly use the token from user
          },
        });
        setUsers(response.data);
        setNotification(`Successfully loaded ${response.data.length} users`);
      } catch (error: any) {
        console.error('Failed to fetch users:', error.response || error);
        setNotification('Error fetching users');
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-screen-xl bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Back
          </button>
        </div>

        {notification && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded shadow text-center">
            {notification}
          </div>
        )}

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="p-4 text-left">No.</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleShow(user)}
                      className="text-purple-600 hover:text-purple-800 text-lg"
                      title="Show"
                    >
                      <FaEye />
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

// interface AuthUser {
//   token: string;
// }


// const Getallusers: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [notification, setNotification] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext) as unknown as { user: AuthUser };


//   useEffect(() => {
//     if (user && typeof user === 'object' && 'token' in user) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${(user as any).token}`;
//     }
//   }, [user]);
  


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
//     <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
//       <div className="w-full max-w-screen-xl bg-white shadow-md rounded-xl p-6 overflow-x-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//           >
//             Back
//           </button>
//         </div>

//         {notification && (
//           <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded shadow text-center">
//             {notification}
//           </div>
//         )}

//         <table className="w-full table-auto border-collapse">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-800">
//               <th className="p-4 text-left">No.</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user, index) => (
//                 <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
//                   <td className="p-4">{index + 1}</td>
//                   <td className="p-4">{user.name}</td>
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4 capitalize">{user.role}</td>
//                   <td className="p-4 text-center">
//                     <button
//                       onClick={() => handleShow(user)}
//                       className="text-purple-600 hover:text-purple-800 text-lg"
//                       title="Show"
//                     >
//                       <FaEye />
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

