import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AuthContext } from './Context/AuthContext';

// Import your pages/components
import Welcome from './pages/Welcome';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Tasks from './pages/Tasks';
import AddTasks from './pages/AddTasks';
import TaskStatus from './pages/TaskStatus';
import UserDataPage from './pages/UserDataPage';
import CompletedTasks from './pages/CompletedTasks';
import AllUsers from './pages/AllUsers';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 p-4 transition-all duration-300">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

            {/* Admin routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/adminpage" element={<AdminPage />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/addTasks" element={<AddTasks />} />
                <Route path="/taskStatus" element={<TaskStatus />} />
                <Route path="/getAllusers" element={<AllUsers />} />
              </>
            )}

            {/* User routes */}
            {user?.role === 'user' && (
              <>
                <Route path="/userPage" element={<UserPage />} />
                <Route path="/userDataPage" element={<UserDataPage />} />
                <Route path="/user-tasks-completed" element={<CompletedTasks />} />
              </>
            )}

            {/* Common routes */}
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Welcome from "./components/Welcomepage";
// import Register from "./components/Register";
// import Admin from "./components/users/Admin";
// import User from "./components/userPage/User";
// import Loadtasks from "./components/crud/Loadtasks";
// import { useContext } from "react";
// import { AuthContext } from "./components/Context/AuthContext";
// import Getallusers from "./components/adminPage/Getallusers";
// import Status from "./components/adminPage/Status";
// import Addtasks from "./components/crud/Addtasks";
// import Edittasks from "./components/crud/Edittasks";
// import Profile from "./components/profile/Profiles";
// import Layout from "./components/layout/Layout";

// import {
//   QueryClient,
//   QueryClientProvider,
  
// } from '@tanstack/react-query'
// import Userdashboard from "./components/userPage/UserDashboard";
// import Responsetask from "./components/userPage/Responsetask";
// import Completed from "./components/userPage/Completed";

// const queryClient = new QueryClient()

// const App = () => {
  
  
//   const { user } = useContext(AuthContext);

//   return (
//     <Router><QueryClientProvider client={queryClient}>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Welcome />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/adminpage" element={user ? <Admin /> : <Login />} />
         
//           <Route path="/userDataPage" element={user ? <User /> : <Login />} />
//           <Route path="/userPage" element={user ? <Userdashboard /> : <Login />} />
//           <Route path="/reponsetask" element={user ? <Responsetask /> : <Login />} />
//           <Route path="/user-tasks-completed" element={user ? <Completed /> : <Login />} />
         
//           <Route path="/tasks" element={user ? <Loadtasks /> : <Login />} />
//           <Route path="/getAllusers" element={user ? <Getallusers /> : <Login />} />
//           <Route path="/taskStatus" element={user ? <Status /> : <Login />} />
//           <Route path="/addTasks" element={user ? <Addtasks /> : <Login />} />
//           <Route path="/update-task/:id" element={user ? <Edittasks /> : <Login />} />
//           <Route path="/profile" element={user ? <Profile /> : <Login />} />
//         </Routes>
//       </Layout></QueryClientProvider>
//     </Router>
//   );
// };

// export default App;

