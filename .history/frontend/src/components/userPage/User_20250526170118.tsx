import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import dayjs from "dayjs";

const User = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // ✅ filter state

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

  // ✅ Function to compute status (adds "incomplete" if eta passed and status is "pending")
  const computeStatus = (task: any) => {
    const now = dayjs();
    const eta = dayjs(task.eta);
    if (task.status === "pending" && eta.isBefore(now)) {
      return "incomplete";
    }
    return task.status;
  };

  // ✅ Filter tasks based on filter state
  const filteredTasks = data?.data.tasks.filter((task: any) => {
    const status = computeStatus(task);
    return filter === "all" ? true : status === filter;
  });

  // ✅ Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "incomplete":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Back Button and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded-md"
        >
          ⬅ Back
        </button>

        <div className="flex flex-wrap gap-2">
          {["all", "draft", "pending", "completed", "incomplete"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                filter === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
        Tasks Page
      </h1>

      {filteredTasks?.length > 0 ? (
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm text-black border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left w-5">S.No</th>
                <th className="border px-4 py-2 text-left">Creator Name</th>
                <th className="border px-4 py-2 text-left">Task Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Priority</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task: any, index: number) => {
                const computedStatus = computeStatus(task); // ✅ re-evaluate status
                return (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
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
                    <td className="border px-4 py-2 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          computedStatus
                        )}`}
                      >
                        {computedStatus}
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
                );
              })}
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

// import { useQuery } from "@tanstack/react-query";
// import api from "../../api/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye } from "lucide-react";

// const User = () => {
//   const id = localStorage.getItem("id") as string;
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     const res = await api.post("/api/Usertasks", { id });
//     return res;
//   };

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ["userTasks", id],
//     queryFn: fetchUser,
//   });

//   useEffect(() => {
//     if (isLoading) {
//       toast.loading("Fetching tasks...", { toastId: "fetching" });
//     }
//     if (isSuccess) {
//       toast.dismiss("fetching");
//       toast.success("Tasks loaded successfully!");
//     }
//     if (isError) {
//       toast.dismiss("fetching");
//       toast.error("Failed to fetch tasks!");
//     }
//   }, [isLoading, isSuccess, isError]);

//   return (
//     <div className="min-h-screen bg-white p-4 sm:p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
//         Tasks Page
//       </h1>

//       {data?.data?.tasks?.length > 0 ? (
//         <div className="overflow-auto border border-gray-300 rounded-md">
//           <table className="min-w-full text-sm text-black border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 text-left w-5">S.No</th>
//                 <th className="border px-4 py-2 text-left ">Creator Name</th>
//                 <th className="border px-4 py-2 text-left">Task Name</th>
//                 <th className="border px-4 py-2 text-left ">Description</th>
//                 <th className="border px-4 py-2 text-left">Priority</th>
//                 <th className="border px-4 py-2 text-left">Status</th>
//                 <th className="border px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.data.tasks.map((task: any, index: number) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2 capitalize">{task.creator_name}</td>
//                   <td className="border px-4 py-2">{task.task_name}</td>
//                   <td className="border px-4 py-2">{task.task_description}</td>
//                   <td className="border px-4 py-2">
//   <span
//     className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//       ${
//         task.priority === "high"
//           ? "bg-red-100 text-red-700"
//           : task.priority === "medium"
//           ? "bg-yellow-100 text-yellow-700"
//           : "bg-green-100 text-green-700"
//       }`}
//   >
//     {task.priority}
//   </span>
// </td>

//                   <td className="border px-4 py-2 capitalize">{task.status}</td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => navigate("/reponsetask", { state: task.id })}
//                       className="flex items-center gap-1 text-blue-600 hover:underline hover:cursor-pointer"
//                       title="Respond to Task"
//                     >
//                       <Eye size={18} />
//                       Update
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-base sm:text-lg">
//           No tasks found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default User;


