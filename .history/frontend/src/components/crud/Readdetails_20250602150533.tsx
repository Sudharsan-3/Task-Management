import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const Readdetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const taskId = state?.task.id
  const task = state?.task

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    navigate(`/update-task/${task.id}`, { state: { task } });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
  
    try {
      await api.delete('/api/delete', {
        data: { id: taskId }
      });
  
      toast.success('Task deleted successfully');
      navigate('/tasks'); // ✅ ensure this route exists
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  
  const formatDate = (datetime:number) => {
    if (!datetime) return 'N/A';
    return new Date(datetime).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const getPriorityColor = (priority:string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
 

  const getStatusColor = (status:string) => {
    switch (status?.toLowerCase()) {
      
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'draft':
        return 'text-gray-500';
      default:
        return 'text-gray-600';
    }
  };
   console.log(state?<div className="task priority"></div>,"from datas Readdetails")

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Back Button */}
      <div className="mb-4">
        <button onClick={handleBack} className="text-gray-600 hover:text-black">
          <FaArrowLeft size={24} />
        </button>
      </div>

      {/* Task Card */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Task Details</h2>

        <div className='flex gap-2'>
          <h4 className="font-semibold text-gray-700">Tiket :</h4>
          <p className="text-gray-600">{state?.task.ticket}</p>
        </div>

        <div className='flex gap-2'>
          <h4 className="font-semibold text-gray-700">User Name:</h4>
          <p className="text-gray-600">{state?.task.task_name}</p>
        </div>

        <div className='flex gap-2'>
          <h4 className="font-semibold text-gray-700">Task Description:</h4>
          <p className="text-gray-600">{state?.task.task_description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className='flex gap-2'>
            <h4 className="font-semibold text-gray-700">Priority:</h4>
            <p className={`${getPriorityColor(state?.task.priority)} font-medium`}>
              {state?.task.priority}
            </p>
          </div>
          <div className='flex gap-2'>
            <h4 className="font-semibold text-gray-700">Status:</h4>
            <p className={`${getStatusColor(state?.task.status)} font-medium`}>
              {state?.task.status}
            </p>
          </div>
        </div>

        <div className='flex gap-2'>
          <h4 className="font-semibold text-gray-700">Note:</h4>
          <p className="text-gray-600">{state?.task.user_comments || 'No comments'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className='flex gap-2'>
            <h4 className="font-semibold text-gray-700">ETA:</h4>
            <p className="text-gray-600">{formatDate(state?.task.eta)}</p>
          </div>
          <div className='flex gap-2'>
            <h4 className="font-semibold text-gray-700">Task created:</h4>
            <p className="text-gray-600">{formatDate(state?.task.created_at)}</p>
          </div>
        </div>

        {/* Edit/Delete Buttons at Bottom */}
        <div className="flex justify-center gap-6 pt-6 border-t mt-6">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Readdetails;

