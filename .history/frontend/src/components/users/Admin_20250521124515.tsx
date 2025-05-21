import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';

const Admin = () => {
  const user = useContext(AuthContext);
  const adminId = user.user?.id;

  const fetchData = async () => {
    const res = await api.post('/api/Admin', { id: adminId });
    return res.data;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['admin-users', adminId],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading('Fetching users and tasks...', { toastId: 'fetching' });
    }
    if (isSuccess) {
      toast.dismiss('fetching');
      toast.success('Users loaded successfully!');
    }
    if (isError) {
      toast.dismiss('fetching');
      toast.error('Failed to fetch users!');
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.user?.name}</h1>

      {isSuccess && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Total Users: {data.users.length}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.users.map((usr) => (
              <div key={usr.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-xl font-bold mb-1">{usr.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{usr.email}</p>
                <p className="text-sm text-gray-800 mb-2">
                  <strong>Tasks Assigned by You:</strong>{' '}
                  {usr.tasks_tasks_user_idTousers.length}
                </p>

                {usr.tasks_tasks_user_idTousers.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {usr.tasks_tasks_user_idTousers.map((task:any) => (
                      <li
                        key={task.id}
                        className="border rounded p-2 bg-gray-50 text-sm"
                      >
                        <p>
                          <strong>Task:</strong> {task.task_name}
                        </p>
                        <p>
                          <strong>Status:</strong>{' '}
                          <span
                            className={`font-semibold ${
                              task.status === 'completed'
                                ? 'text-green-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {task.status}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

// import  { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../Context/AuthContext'
// import { useQuery } from '@tanstack/react-query';
// import api from '../../api/axios';
// import { toast,ToastContainer } from 'react-toastify';


// const Admin = () => {
//   const user = useContext(AuthContext);
//   const [value,setValue] = useState()
//   const id = user.user?.id

//   const featchData = async()=>{
//     const res = await api.post("/api/Admin",{id});
//     return res.data;
//   }
//   const {data,isLoading,isSuccess,isError} = useQuery({
//     queryKey : ['user id' , id],
//     queryFn: featchData,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//   })
// useEffect(() => {
//     if (isLoading) {
//       toast.loading('Fetching tasks...', { toastId: 'fetching' });
//     }
//     if (isSuccess) {
      
//       toast.dismiss('fetching');
//       toast.success('Users loaded successfully!');
     
     
//     }
//     if (isError) {
//       console.log(isError)
//       toast.dismiss('fetching');
//       toast.error('Failed to fetch users!');
//     }
//   }, [isLoading, isSuccess, isError]);
  
//   console.log(JSON.stringify(data))
//   console.log(user.user)
//   return (
//     <div>
//       <ToastContainer position='top-right' autoClose={3000} />
//       <h1>Welcom {user.user?.name} </h1>
//      {/* {data.users.map((e:string|number,index:number)=>{
//       <li key={index}>
//         <h1>{e}</h1>
//       </li>
//      }) } */}

      
//     </div>
//   )
// }

// export default Admin

