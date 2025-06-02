import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import 

const Completed = () => {
  const id = localStorage.getItem("id") as string;

  const fetchUser = async () => {
    const res = await api.post("/api/UserCompleted", { id });
    return res;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching tasks...", { toastId: "fetching" });
    }
    if (isSuccess) {
      toast.dismiss("fetching");
      toast.success("Tasks loaded successfully!");
    }
    if (isError) {
      toast.dismiss("fetching");
      toast.error("Failed to fetch tasks!");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-blue-600 hover:cursor-pointer"
        >
          <FaArrowLeft className="mr-2" />
        </button>

      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-6">
        Completed Tasks
      </h1>

      {data?.data?.tasks?.length > 0 ? (
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm text-black border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">S.No</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Task Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Priority</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">User Comment</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.tasks.map((task: any, index: number) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 capitalize">{task.user_name}</td>
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
      ${task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="border px-4 py-2 capitalize">{task.status}</td>
                  <td className="border px-4 py-2">{task.user_comments || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-base sm:text-lg">
          No completed tasks found.
        </p>
      )}
    </div>
  );
};

export default Completed;


