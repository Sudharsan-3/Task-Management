import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await api.post("/api/Usertasks", { id });
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
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
         Tasks Page
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => {}}
        >
          Your Tasks
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/user-tasks-completed")}
        >
          Completed
        </button>
      </div>

      {data?.data?.tasks?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="py-2 px-4 text-left">S.No</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Task Name</th>
                <th className="py-2 px-4 text-left">Priority</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">UserCommad</th>
              </tr>
            </thead>
            <tbody>
              {data.data.tasks.map((task: any, index: number) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 capitalize">{task.user_name}</td>
                  <td className="py-2 px-4">{task.task_name}</td>
                  <td className="py-2 px-4 capitalize">{task.priority}</td>
                  <td className="py-2 px-4 capitalize">{task.status}</td>
                  <td className="py-2 px-4">
                    {task.user_comments |}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No tasks found.</p>
      )}
    </div>
  );
};

export default Completed;


