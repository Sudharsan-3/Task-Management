import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Welcome from "./components/Welcomepage";
import Register from "./components/Register"
import Admin from "./components/users/Admin"
import User from "./components/users/User"
import Loadtasks from "./components/crud/Loadtasks";
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthContext";
import Getallusers from "./components/adminPage/Getallusers";
import Status from "./components/adminPage/Status";
import Addtas


const App = () => {
 
  const {user} = useContext(AuthContext)
  console.log(user,"App user")
  
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/adminpage" element={ user?<Admin  />:<Login />} />
        <Route path="/userPage" element={user? <User  />:<Login />} />
        <Route path="/tasks" element={user? <Loadtasks  />: <Login /> } />
        <Route path="/getAllusers" element={user? <Getallusers  />: <Login /> } />
        <Route path="/taskStatus" element={user? <Status  />: <Login /> } />
        <Route path="/addTasks" element={user? <Addtasks  />: <Login /> } />
        
        
      </Routes>
    </Router>
  );
};

export default App;
