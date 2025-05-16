import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional icon for back button
import { AuthContext } from "../Context/AuthContext";

const Profile: React.FC = () => {
  const [users, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const {user,dispatch} = useContext(AuthContext)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    navigate("/login");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-md relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="mr-1 w-5 h-5" />
        Back
      </button>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user ? (
          <>
            <p className="text-lg"><strong>Username:</strong> {users.name || "N/A"}</p>
            <p className="text-lg mb-2"><strong>Email:</strong> {users.email || "N/A"}</p>
            <p className="text-lg mb-6"><strong>Role:</strong> {users.role || "N/A"}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
