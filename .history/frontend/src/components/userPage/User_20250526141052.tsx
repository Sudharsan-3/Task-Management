import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowLeft, ArrowRight } from "lucide-react";

const User = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const fetchUser = async () => {
    const res = await api.post("/api/Usertasks", { id });
    return res;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchUser,
  });

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore time
    return today;
  };

  const getFilteredTasks = () => {
    if (!data?.data?.tasks) return [];

    const today = getToday();
    const tasks = data.data.tasks;

    switch (filter) {
      case "pending":
        return tasks
          .filter((t: any) => t.status.toLowerCase() === "pending")
          .sort((a: any, b: any) => new Date(a.eta).getTime() - new Date(b.eta).getTime());
      case "completed":
        return tasks.filter((t: any) => t.status.toLowerCase() === "completed");
      case "incompleted":
        return tasks.filter((t: any) => {
          const etaDate = new Date(t.eta);
          return t.status.toLowerCase() === "pending" && etaDate < today;
        });
      default:
        const pending = tasks
          .filter((t: any) => t.status.toLowerCase() === "pending")
          .sort((a: any, b: any) => new Date(a.eta).getTime() - new Date(b.eta).getTime());
        const others = tasks.filter((t: any) => t.status.toLowerCase() !== "pending");
        return [...pending, ...others];
    }
  };

  const filteredTasks = getFilteredTasks();

  // Show overdue warning for "incompleted" filter
  useEffect(() => {
    if (filter === "incompleted" && filteredTasks.length > 0) {
      toast.warning(`⚠️ You have ${filteredTasks.length} overdue incompleted task(s)!`);
    }
  }, [filter]);

  useEffect(() => {
    if (isLoading) toast.loading("Fetching tasks...", { toastId: "fetching" });
    if (isSuccess) {
      toast.dismiss("fetching");
      toast.success("Tasks loaded!");
    }
    if (isError) {
      toast.dismiss("fetching");
      toast.error("Error loading tasks.");
    }
  }, [isLoading, isSuccess, isError]);

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 text-black">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
        </select>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        Tasks Page
      </h1>

      {filteredTasks.length > 0 ? (
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">S.No</th>
                <th className="border px-4 py-2 text-left">Creator</th>
                <th className="border px-4 py-2 text-left">Task Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Priority</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task: any, i: number) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2 capitalize">{task.creator_name}</td>
                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.task_description}</td>
                  <td className="border px-4 py-2 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 flex items-center gap-2">
                    <button title="View Details">
                      <Eye size={18} className="text-blue-600 hover:scale-105" />
                    </button>
                    <button title="More Info">
                      <ArrowRight size={18} className="text-gray-600 hover:scale-105" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">No tasks found.</p>
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
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//       ${task.priority === "high"
//                           ? "bg-red-100 text-red-700"
//                           : task.priority === "medium"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-green-100 text-green-700"
//                         }`}
//                     >
//                       {task.priority}
//                     </span>
//                   </td>

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


