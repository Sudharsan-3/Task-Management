import React from "react";
import { useNavigate } from "react-router-dom";

const Userdashboard = () => {
    const [datas]
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleViewTasks = () => {
    navigate("/user-tasks"); // Adjust route as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>

        {userData ? (
          <div className="space-y-4 text-left">
            <div>
              <span className="font-semibold text-gray-600">Name:</span>
              <p className="text-lg text-gray-900">{userData.name}</p>
            </div>

            <div>
              <span className="font-semibold text-gray-600">Email:</span>
              <p className="text-lg text-gray-900">{userData.email}</p>
            </div>

            <div>
              <span className="font-semibold text-gray-600">Role:</span>
              <p className="text-lg text-gray-900 capitalize">{userData.role}</p>
            </div>

            <button
              onClick={handleViewTasks}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              View Tasks
            </button>
          </div>
        ) : (
          <h3 className="text-xl text-gray-700">No user data found.</h3>
        )}
      </div>
    </div>
  );
};

export default Userdashboard;

// import React from 'react'

// const Userdashboard = () => {
//     const userData = JSON.parse( localStorage.getItem("user"))

//   return (
//     <div>
//         {userData.length>0 ?( userData.map() <div>
//             <h1>Name :<p></p>
//         </h1>
//         <h2>
//             Email : <p></p>

//         </h2>
//         <h3>Role :<p>


//         </p> </h3>
//         </div>): (<h3>No data</h3>)

//         }
       

        
        
      
//     </div>
//   )
// }

// export default Userdashboard
