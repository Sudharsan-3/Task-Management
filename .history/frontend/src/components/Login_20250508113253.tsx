import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState  } from "react";
import api from "../api/axios";
import { AuthContext } from "./Context/AuthContext";
import { UserData } from "./Context/usersDataContext";

type FormData = {
  email: string;
  password: string;
};


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);
  const {valueHandel} = useContext(UserData)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const response = await api.post("/api/login", { email, password });

      const [details, tokenObj] = response.data;
      const { name, role, email: userEmail } = details;
      const token = tokenObj.token;
      

      if (name && role && token) {
        console.log("Login successful:", name, role, userEmail, token);
        setError("");

        // Store token and update auth context
        localStorage.setItem("token", token);
        dispatch({ type: "LOGIN", payload: token });

        // Navigate after login
        if (role === "admin") {
          alert(`Login successful as Admin: ${name}`);
          
          navigate("/adminpage");
        } else if (role === "user") {
          alert(`Login successful as User: ${name}`);
          navigate("/userPage");
        } else {
          setError("Unknown role. Please contact support.");
        }
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-indigo-500 text-white">
      <div className="w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="font-semibold">Enter E-mail</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label className="font-semibold">Enter Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="flex justify-between text-blue-500 text-sm mt-2">
            <p className="hover:underline cursor-pointer">Forgot Password?</p>
            <p
              onClick={() => navigate("/Register")}
              className="hover:underline cursor-pointer"
            >
              Create Account
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;


