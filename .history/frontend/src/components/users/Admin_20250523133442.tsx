import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Task {
  id: number;
  status: 'draft' | 'in-progress' | 'completed';
  [key: string]: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  tasks_tasks_user_idTousers: Task[];
  [key: string]: any;
}

interface ResponseData {
  users: User[];
}

const COLORS = {
  draft: '#FBBF24',
  'in-progress': '#3B82F6',
  completed: '#34D399',
};

const Admin: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async (): Promise<ResponseData> => {
    const res = await api.post('/api/Admin', { id: user?.id });
    return res.data;
  };

  const { data, isLoading, isSuccess, isError } = useQuery<ResponseData>({
    queryKey: ['admin-dashboard', user?.id],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading dashboard...', { toastId: 'load' });
    }
    if (isSuccess) {
      toast.dismiss('load');
      toast.success('Dashboard ready');
    }
    if (isError) {
      toast.dismiss('load');
      toast.error('Failed to load dashboard');
    }
  }, [isLoading, isSuccess, isError]);

  const users: User[] = data?.users || [];

  const allTasks: Task[] = users.flatMap((user) => user.tasks_tasks_user_idTousers || []);
  const totalTasks = allTasks.length;
  const draft = allTasks.filter((t) => t.status === 'draft').length;
  const inProgress = allTasks.filter((t) => t.status === 'in-progress').length;
  const completed = allTasks.filter((t) => t.status === 'completed').length;

  const getPercentage = (count: number): string => {
    return totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : '0';
  };

  const MiniPieChart = ({
    label,
    count,
    color,
  }: {
    label: string;
    count: number;
    color: string;
  }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[
                { name: label, value: count },
                { name: 'Other', value: totalTasks - count },
              ]}
              dataKey="value"
              innerRadius={30}
              outerRadius={40}
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={color} />
              <Cell fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">
          {count} / {totalTasks} ({getPercentage(count)}%)
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

      {isSuccess && (
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Admin Overview</h2>
          
          <p className="text-lg font-bold mb-4 text-blue-600">
            Total Users: {users.length}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            <MiniPieChart label="Draft" count={draft} color={COLORS.draft} />
            <MiniPieChart label="In Progress" count={inProgress} color={COLORS['in-progress']} />
            <MiniPieChart label="Completed" count={completed} color={COLORS.completed} />
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

