import React from 'react'
import auth

const Admin = () => {
  return (
    <div>
      <h1>Welcom </h1>
      
    </div>
  )
}

export default Admin

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';





// const Admin: React.FC = () => {
//   // 
//   const [notification, setNotification] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const {user} = useContext(AuthContext)

//  console.log(user,"from Admin")

//   const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     const key = e.currentTarget.value;
//     console.log("Button clicked:", key);

//     if (key === "users") {
      
//       setNotification("Fetching users...");
//       navigate("/getAllusers")
      
//     } else if (key === "tasks") {
//       console.log("Tasks button clicked");
//       navigate("/tasks")
//     } else if (key === "status") {
//       navigate("/taskStatus")
//       console.log("Status button clicked");
//     } else if (key === "addTask") {
//       navigate("/addTasks")
//       console.log("Add Task button clicked");
//       // You can use navigate() or open a modal here
//     }
//   };
  
//   console.log(localStorage.getItem("id"))
 
//   useEffect(() => {
   
  
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-100">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Admin Page</h1>

//       {notification && (
//         <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-md">
//           {notification}
//         </div>
//       )}

//       <div className="flex flex-wrap gap-6 justify-center">
//         <button
//           onClick={clickHandler}
//           value="users"
//           className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer"
//         >
//           Users
//         </button>
//         <button
//           onClick={clickHandler}
//           value="tasks"
//           className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all cursor-pointer"
//         >
//           Tasks
//         </button>
//         <button
//           onClick={clickHandler}
//           value="status"
//           className="px-8 py-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all cursor-pointer"
//         >
//           Status
//         </button>
//         <button
//           onClick={clickHandler}
//           value="addTask"
//           className="px-8 py-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-all cursor-pointer"
//         >
//           Add Task
//         </button>
//       </div>

      
//     </div>
//   );
// };

// export default Admin;
