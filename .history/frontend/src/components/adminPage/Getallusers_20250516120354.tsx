import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  users:string
}

const Getallusers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log(JSON.stringify(user),"from alll usr auth context")
  const value = JSON.stringify(user)

  // Set the auth token for Axios globally
  useEffect(() => {
    if (typeof user === 'string') {
      axios.defaults.headers.common['Authorization'] = user;
    }
  }, [user]);

  // Handle showing user info in a toast
  const handleShow = (value: User) => {
    toast.info(
      `Name: ${value.name}\nEmail: ${value.email}\nRole: ${value.role}`,
      {
        position: 'top-right',
        autoClose: 3000,
      
      }
    );
  };

  const featchData = async()=>{
    const res = await api.get('/api/allUsers')
    return res.data
  }
  const {data,isLoading,isSuccess,isError} = useQuery({
    queryKey:['Getalluser',value],
    queryFn:featchData,
  })

    useEffect(() => {
      if (isLoading) {
        toast.loading("Fetching tasks...", { toastId: "fetching" });
      }
      if (isSuccess) {
        toast.dismiss("fetching");
        toast.success("Tasks loaded successfully!");
        console.log(data.users,"from allusers is success")
        setUsers(data.users)
       
      }
      if (isError) {
        toast.dismiss("fetching");
        toast.error("Failed to fetch tasks!");
      }
    }, [isLoading, isSuccess, isError]);

  // Fetch all users from API
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get<User[]>('/api/allUsers');
  //       console.log(response.data.users,"from use effect")
  //       if (Array.isArray(response.data.users)) {
  //         setUsers(response.data.users);
  //         console.log(response.data.users,"from alluser")
  //         toast.success(`Loaded ${response.data.length} users`, {
  //           position: 'top-right',
  //           autoClose: 3000,
  //         });
  //       } else {
  //         toast.error('Invalid response from server.', {
  //           position: 'top-right',
  //           autoClose: 3000,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //       toast.error('Failed to fetch users', {
  //         position: 'top-right',
  //         autoClose: 3000,
  //       });
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-start flex-col  mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue- text-white font-semibold py-2 px-4 rounded"
        >
          {"<--"}
        </button>
        <h2 className="text-2xl font-bold text-right">All Users</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 capitalize">{user.role}</td>
                  <td className="border px-4 py-2 text-center text-lg">
                    <button
                      onClick={() => handleShow(user)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Show"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No users found.
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

