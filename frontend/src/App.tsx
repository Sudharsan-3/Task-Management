import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Welcome from "./components/Welcomepage";
import Register from "./components/Register"
import Admin from "./components/users/Admin"



const App = () => {
 
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/Register" element={<Register  />} />
        <Route path="/adminpage" element={<Admin  />} />
        
      </Routes>
    </Router>
  );
};

export default App;
