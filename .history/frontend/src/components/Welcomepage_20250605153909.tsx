import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.tsx";
import { useContext } from "react";

const WelcomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user?.role === "admin") {
      navigate("/adminpage");
    } else if (user?.role === "user") {
      navigate("/userDataPage");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-4">
      <div className="flex flex-col gap-6 bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Daily Task ✅</h1>
        <p className="text-base sm:text-lg">
          Manage your daily tasks efficiently and stay productive!
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
