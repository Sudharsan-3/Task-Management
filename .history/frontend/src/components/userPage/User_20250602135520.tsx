import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

interface Task {
  id: number;
  creator_name: string;
  task_name: string;
  task_description: string;
  priority: "low" | "medium" | "high";
  status: "draft" | "pending" | "completed" | "incomplete";
  eta: string; // expected in format "2025-06-03 13:38:00+05:30"
  ticket: string; // e.g. "TICK-DATE(020625)-001"
}

interface ApiResponse {
  tasks: Task[];
}

const User: React.FC = () => {
  const id = localStorage.getItem("id") ?? "";
  const navigate = useNavigate();

  const fetchUser = async (): Promise<ApiResponse> => {
    const res = await api.post("/api/Usertasks", { id });
    return res.data;
  };

  const { data, isLoading, isSuccess, isError } = useQuery<ApiResponse>({
    queryKey: ["userTasks", id],
    queryFn: fetchUser,
  });

  // Filter state
  const [filter, setFilter] = useState<"all" | "draft" | "pending" | "completed" | "incomplete">("all");
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Toast notifications for query states
  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching tasks...", { toastId: "fetching" });
    } else {
      toast.dismiss("fetching");
    }
    if (isSuccess) {
      toast.success("Tasks loaded successfully!");
    }
    if (isError) {
      toast.error("Failed to fetch tasks!");
    }
  }, [isLoading, isSuccess, isError]);

  // Helper: Check if task is overdue & incomplete -> move to "incomplete"
  const adjustTaskStatus = (task: Task): Task => {
    const now = new Date();
    const etaDate = new Date(task.eta.replace(" ", "T")); // convert to ISO format by replacing space with T
    if ((task.status !== "completed") && etaDate < now) {
      return { ...task, status: "incomplete" };
    }
    return task;
  };

  // Apply status adjustment and then filter & search
  const filteredTasks = useMemo(() => {
    if (!data?.tasks) return [];

    // Adjust task status for overdue
    const adjustedTasks = data.tasks.map(adjustTaskStatus);

    // Filter by status
    const statusFiltered = filter === "all" ? adjustedTasks : adjustedTasks.filter(t => t.status === filter);

    // Filter by searchTerm (case insensitive match in ticket)
    if (!searchTerm.trim()) return statusFiltered;

    const term = searchTerm.trim().toLowerCase();
    return statusFiltered.filter(task => task.ticket.toLowerCase().includes(term));
  }, [data?.tasks, filter, searchTerm]);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
        Tasks Page
      </h1>

      {/* Search Input */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by ticket (e.g. TICK-DATE(020625)-001)"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["all", "draft", "pending", "completed", "incomplete"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as typeof filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize
              ${filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tasks Table */}
      {filteredTasks.length > 0 ? (
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
                <th className="border px-4 py-2 text-left">ETA</th>
                <th className="border px-4 py-2 text-left">Ticket</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
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
                  <td className="border px-4 py-2 capitalize">{task.status}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{task.eta}</td>
                  <td className="border px-4 py-2 whitespace-nowrap font-mono">{task.ticket}</td>
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


