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
  status: 'draft' | 'pending' | 'completed';
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
  pending: '#60A5FA', // blue-400
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
  const pending = allTasks.filter((t) => t.status === 'pending').length;
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
        <FaArrowLeft className="mr-2" />
      </button>

      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

      {isSuccess && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: Total Users */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-1">Total Users</h2>
              <p className="text-gray-500 text-sm">Registered in the system</p>
            </div>
            <div className="text-5xl font-bold text-gray-800">{users.length}</div>
          </div>

          {/* Card 2: Task Details */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Task Status Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MiniPieChart label="Draft" count={draft} color={COLORS.draft} />
              <MiniPieChart label="Pending" count={pending} color={COLORS.pending} />
              <MiniPieChart label="Completed" count={completed} color={COLORS.completed} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
