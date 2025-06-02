import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

interface TaskType {
  id: number;
  user_id: number;
  creator_id: number;
  creator_name:string
  task_name: string;
  task_description?: string;
  user_comments?: string;
  priority: string;
  status: string;
  user_name?: string;
  eta?: string;
}

const Responsetask: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const { user } = useContext(AuthContext);
  console.log(user)

  const fetchData = async (): Promise<{ tasks: TaskType }> => {
    const res = await api.patch("/api/Usergettask", { id });
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchData,
  });

  const task = data?.tasks;

  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("draft");
  const [eta, setEta] = useState<string>("");

  useEffect(() => {
    if (task) {
      setDescription(task.user_comments || "");
      setStatus(task.status || "draft");
      setEta(task.eta ? new Date(task.eta).toISOString().slice(0, 16) : "");
    }
  }, [task]);

  const formattedEta = eta ? new Date(eta).toISOString() : null;

  const handleSubmit = async () => {
    try {
      if (!description || !status) {
        toast.error("Please provide both description and status");
        return;
      }

      await api.put("/api/UpdateuserTask", {
        id: task?.id,
        user_comments: description,
        status,
        eta:formattedEta,
      });

      toast.success("Response submitted successfully!");
      navigate("/userPage")
    } catch (err) {
      toast.error("Failed to submit response");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !task) {
    return <p className="text-center mt-10 text-red-500">Error loading task.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Respond to Task
      </h1>
      

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <div className='flex gap-2'>
          <h4 className="font-semibold text-gray-700">Tiket :</h4>
          <p className="text-gray-600">{task.ticket}</p>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Creator Name</label>
          <input
            type="text"
            value={task.creator_name || ""}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>
        

        <div>
          <label className="block font-semibold text-gray-700">Task Name</label>
          <input
            type="text"
            value={task.task_name}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Task Description</label>
          <textarea
            value={task.task_description || ""}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Priority</label>
          <input
            type="text"
            value={task.priority}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Your Description</label>
          <textarea
            placeholder="Add your response"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Estimated Completion Time (ETA)</label>
          <input
            type="datetime-local"
            value={eta}
            onChange={(e) => setEta(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 p-2 border rounded hover:cursor-pointer"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 hover:cursor-pointer"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default Responsetask;

