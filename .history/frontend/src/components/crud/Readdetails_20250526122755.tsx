import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';

const Readdetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // Navigate to edit page (customize as needed)
    navigate('/edit-task', { state });
  };

  const handleDelete = () => {
    // Logic for deleting task
    alert('Delete functionality not implemented');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={handleBack} className="text-gray-600 hover:text-black">
          <FaArrowLeft size={24} />
        </button>
        <div className="flex gap-4">
          <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800">
            <FaEdit size={22} />
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <FaTrash size={22} />
          </button>
        </div>
      </div>

      {/* Task details card */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Task Details</h2>

        <div>
          <h4 className="font-semibold text-gray-700">Token:</h4>
          <p className="text-gray-600">TICK-DATE(120525)-001</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">User Name:</h4>
          <p className="text-gray-600">{state?.task.task_name}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">Task Description:</h4>
          <p className="text-gray-600">{state?.task.task_description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">Priority:</h4>
            <p className="text-gray-600">{state?.task.priority}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Status:</h4>
            <p className="text-gray-600">{state?.task.status}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700">Note:</h4>
          <p className="text-gray-600">{state?.task.user_comments || 'No comments'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">ETA:</h4>
            <p className="text-gray-600">{state?.task.eta || 'N/A'}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Created At:</h4>
            <p className="text-gray-600">{state?.task.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readdetails;

// import { useLocation } from 'react-router-dom'

// const Readdetails = () => {
//     const location = useLocation();
//     const state = location.state;
//   return (
//     <div>

//       <h1>View task page</h1>
          
//     <h4>Token :</h4>
//     <p>TICK-DATE(120525)-001
//     </p>

//     <h4>User Name :</h4>
//     <p>{state?.task.task_name}</p>
//     <h4>Task Discription :</h4>
//     <p>{state?.task.task_description}</p>
//     <h4>Priority</h4>
//     <p>{state?.task.priority}</p>    
//     <h4>Status</h4>
//     <p>{state?.task.status}</p>
        
//     <h4>Note :</h4>
//     <p>{state?.task.user_comments}</p>    
//     <h4>Eta :</h4>
//     <p>{state?.task.eta}</p>
        
//     <h4>Create at :</h4>
//     <p>{state?.task.created_at}</p>
//     </div>
    
//   )
// }

// export default Readdetails
