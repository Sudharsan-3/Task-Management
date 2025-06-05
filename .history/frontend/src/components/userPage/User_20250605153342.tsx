import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, CheckCircle } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const User = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchUser = async () => {
    const res = await api.post("/api/Usertasks", { id });
    return res;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (data?.data?.tasks?.length) {
      const now = new Date();
      const updatedTasks = data.data.tasks.map((task: any) => {
        const eta = task.eta ? new Date(task.eta) : null;
        const status = task.status.toLowerCase();

        if (eta && eta < now && status !== "completed" && status !== "incomplete") {
          updateTaskStatus(task.id, "incomplete");
          return { ...task, status: "incomplete" };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  }, [data]);

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      await api.post("/api/updatetaskstatus", { taskId, status });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status.");
    }
  };

  useEffect(() => {
    if (isLoading) toast.loading("Fetching tasks...", { toastId: "fetching" });
    if (isSuccess) {
      toast.dismiss("fetching");
      toast.success("Tasks loaded successfully!");
    }
    if (isError) {
      toast.dismiss("fetching");
      toast.error("Failed to fetch tasks!");
    }
  }, [isLoading, isSuccess, isError]);

  const handleMarkCompleted = (taskId: string) => {
    const confirmed = window.confirm("Are you sure you want to mark this task as completed?");
    if (!confirmed) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );

    updateTaskStatus(taskId, "completed");
    toast.success("Task marked as completed!");
  };

  const filteredTasks = tasks.filter((task) => {
    const status = task.status.toLowerCase();
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "incomplete"
        ? status === "incomplete"
        : status === filterStatus;

    const matchesPriority =
      filterPriority === "all"
        ? true
        : task.priority?.toLowerCase() === filterPriority;

    const matchesSearch = task.ticket?.toLowerCase().includes(searchQuery);

    const matchesDate =
      !filterDate
        ? true
        : new Date(task.eta).toISOString().slice(0, 10) ===
          filterDate.toISOString().slice(0, 10);

    return matchesStatus && matchesPriority && matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-800 text-white";
      case "pending":
        return "bg-orange-600 text-white";
      case "draft":
        return "bg-gray-200 text-gray-600";
      case "incomplete":
        return "bg-red-700 text-white";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-600 hover:cursor-pointer"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-black">Your Assigned Tasks</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Ticket (TICK-...)"
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded px-2 py-1"
            placeholderText="dd / mm / yyyy"
            isClearable
          />
        </div>
      </div>

      {/* Responsive display */}
      <div className="block lg:hidden">
        {/* Card layout for small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-500">{task.ticket}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <h2 className="text-lg font-semibold mb-1 text-gray-800">{task.task_name}</h2>
                <p className="text-sm text-gray-600 mb-1">Creator: <span className="capitalize">{task.creator_name}</span></p>
                <p className="text-sm text-gray-600 mb-1 capitalize">Priority: {task.priority}</p>
                {task.eta && (
                  <p className="text-sm text-gray-600 mb-1">ETA: {new Date(task.eta).toLocaleDateString()}</p>
                )}
                {task.user_comments && (
                  <p className="text-sm text-gray-600 mb-2">Your Comments: <em>{task.user_comments}</em></p>
                )}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => navigate("/reponsetask", { state: task.id })}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Eye size={18} />
                    Update
                  </button>
                  {task.eta && task.status.toLowerCase() !== "completed" && (
                    <button
                      onClick={() => handleMarkCompleted(task.id)}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <CheckCircle size={18} />
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-base sm:text-lg">No tasks found.</p>
          )}
        </div>
      </div>

      {/* Table layout for large screens */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Ticket</th>
              <th className="border px-3 py-2 text-left">Task Name</th>
              <th className="border px-3 py-2 text-left">Creator</th>
              <th className="border px-3 py-2 text-left">Priority</th>
              <th className="border px-3 py-2 text-left">ETA</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2 text-left">Comments</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{task.ticket}</td>
                <td className="border px-3 py-2">{task.task_name}</td>
                <td className="border px-3 py-2 capitalize">{task.creator_name}</td>
                <td className="border px-3 py-2 capitalize">{task.priority}</td>
                <td className="border px-3 py-2">{task.eta ? new Date(task.eta).toLocaleDateString() : "-"}</td>
                <td className={`border px-3 py-2 font-semibold ${getStatusColor(task.status)}`}>{task.status}</td>
                <td className="border px-3 py-2">{task.user_comments || "-"}</td>
                <td className="border px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/reponsetask", { state: task.id })}
                      text
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      <Eye size={18} />
                    
                    </button>
                    {task.eta && task.status.toLowerCase() !== "completed" && (
                      <button
                        onClick={() => handleMarkCompleted(task.id)}
                        className="text-green-600 hover:underline cursor-pointer"
                      >
                         <CheckCircle size={18} />
                       
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-600 py-4">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default User;




