import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const User = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterDate, setFilterDate] = useState<Date | null>(null); // new date filter
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);

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

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleFilterPriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value);
  };

  // const handleFilterDate = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFilterDate(e.target.value);
  // };

  const handleFilterDate = (date:any) => {
    setFilterDate(date);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTasks = tasks?.filter((task: any) => {
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
      filterDate === ""
        ? true
        : new Date(task.eta).toISOString().slice(0, 10) === filterDate;

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
      </button>
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
        Tasks Page
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Ticket (TICK-...)"
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-80"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex gap-2.5">
          <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select
          value={filterPriority}
          onChange={handleFilterPriority}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <DatePicker
              selected={filterDate}
              onChange={handleFilterDate}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 rounded px-2 py-1"
              placeholderText=' dd / mm / yyyy '
            />
        </div>
        
      </div>

      {/* Task Table */}
      {filteredTasks?.length > 0 ? (
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm text-black border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Ticket</th>
                <th className="border px-4 py-2 text-left">Creator Name</th>
                <th className="border px-4 py-2 text-left">Task Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Priority</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task: any) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-xs">{task.ticket}</td>
                  <td className="border px-4 py-2 capitalize">{task.creator_name}</td>
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="border px-4 py-2 capitalize rounded-full text-xs font-semibold">
                    <span className={`${getStatusColor(task.status)} px-2 py-1 rounded-full`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => navigate("/reponsetask", { state: task.id })}
                      className="flex items-center gap-1 text-blue-600 hover:underline hover:cursor-pointer"
                      title="Respond to Task"
                    >
                      <Eye size={18} />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-base sm:text-lg">
          No tasks found.
        </p>
      )}
    </div>
  );
};

export default User;

