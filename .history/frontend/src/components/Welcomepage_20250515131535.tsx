import { useNavigate } from "react-router-dom";
import {AuthContext} from "./Context/AuthContext.tsx"
import { useContext } from "react";

const WelcomePage = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleClick = () => {
    if(user?.role === "role" ){

    }else
    user?navigate("/adminpage"):navigate("/login")
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-blue-10 to-indigo-500 text-white">
      <div className="flex flex-col gap-6 bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold">Welcome to Daily Task ✅</h1>
        <p className="text-lg">Manage your daily tasks efficiently and stay productive!</p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

