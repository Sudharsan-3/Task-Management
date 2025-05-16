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

