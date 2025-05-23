import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#FBBF24', '#3B82F6', '#34D399']; // draft, in-progress, completed

const Admin = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const adminId = user.user?.id;

  const fetchData = async () => {
    const res = await api.post('/api/Admin', { id: adminId });
    return res.data;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['admin-dashboard', adminId],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading('Fetching dashboard data...', { toastId: 'fetching' });
    }
    if (isSuccess) {
      toast.dismiss('fetching');
      toast.success('Dashboard loaded!');
    }
    if (isError) {
      toast.dismiss('fetching');
      toast.error('Failed to fetch data!');
    }
  }, [isLoading, isSuccess, isError]);

  // Aggregate stats
  const users = data?.users || [];
  const allTasks = users.flatMap(user:any => user.tasks_tasks_user_idTousers || []);
  const draft = allTasks.filter(t:any => t.status === 'draft').length;
  const inProgress = allTasks.filter(t:any => t.status === 'in-progress').length;
  const completed = allTasks.filter(t:any => t.status === 'completed').length;

  const pieData = [
    { name: 'Draft', value: draft },
    { name: 'In Progress', value: inProgress },
    { name: 'Completed', value: completed },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Welcome, {user.user?.name}</h1>

      {isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Users Card */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-blue-600">{users.length}</p>
          </div>

          {/* Task Overview Card */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Distribution</h2>
            {allTasks.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No tasks assigned yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

// import { useContext, useEffect } from 'react';
// import { AuthContext } from '../Context/AuthContext';
// import { useQuery } from '@tanstack/react-query';
// import api from '../../api/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// // 🟦 Type Definitions
// type Task = {
//   id: number;
//   user_id: number;
//   creator_id: number;
//   task_name: string;
//   task_description: string;
//   user_comments: string | null;
//   priority: 'low' | 'medium' | 'high';
//   status: 'draft' | 'completed' | 'in-progress';
//   created_at: string;
//   updated_at: string;
//   user_name: string;
//   creator_name: string;
//   eta: string | null;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: 'user' | 'admin';
//   createdAt: string;
//   updatedAt: string;
//   tasks_tasks_user_idTousers: Task[];
// };

// type ApiResponse = {
//   message: string;
//   users: User[];
// };

// const Admin = () => {
//   const user = useContext(AuthContext);
//   const navigate = useNavigate();
//   const adminId = user.user?.id;

//   const fetchData = async (): Promise<ApiResponse> => {
//     const res = await api.post('/api/Admin', { id: adminId });
//     return res.data;
//   };

//   const { data, isLoading, isSuccess, isError } = useQuery<ApiResponse>({
//     queryKey: ['admin-users', adminId],
//     queryFn: fetchData,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading('Fetching users and tasks...', { toastId: 'fetching' });
//     }
//     if (isSuccess) {
//       toast.dismiss('fetching');
//       toast.success('Users loaded successfully!');
//     }
//     if (isError) {
//       toast.dismiss('fetching');
//       toast.error('Failed to fetch users!');
//     }
//   }, [isLoading, isSuccess, isError]);

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center mb-4 text-blue-600 hover:underline"
//       >
//         <FaArrowLeft className="mr-2" />
//       </button>

//       <h1 className="text-2xl font-bold mb-4">
//         Welcome, {user.user?.name}
//       </h1>

//       {isSuccess && (
//         <div>
//           <h2 className="text-lg font-semibold mb-2">
//             Total Users: {data.users.length}
//           </h2>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {data.users.map((usr) => (
//               <div
//                 key={usr.id}
//                 className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
//               >
//                 <h3 className="text-xl font-bold mb-1">{usr.name}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{usr.email}</p>
//                 <p className="text-sm text-gray-800 mb-2">
//                   <strong>Tasks Assigned by You:</strong>{' '}
//                   {usr.tasks_tasks_user_idTousers.length}
//                 </p>

//                 {usr.tasks_tasks_user_idTousers.length > 0 && (
//                   <ul className="mt-2 space-y-2">
//                     {usr.tasks_tasks_user_idTousers.map((task) => (
//                       <li
//                         key={task.id}
//                         className="border rounded p-2 bg-gray-50 text-sm"
//                       >
//                         <p>
//                           <strong>Task:</strong> {task.task_name}
//                         </p>
//                         <p>
//                           <strong>Status:</strong>{' '}
//                           <span
//                             className={`font-semibold ${
//                               task.status === 'completed'
//                                 ? 'text-green-600'
//                                 : task.status === 'draft'
//                                 ? 'text-yellow-600'
//                                 : 'text-blue-600'
//                             }`}
//                           >
//                             {task.status}
//                           </span>
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

