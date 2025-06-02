import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const User = () => {
  const id = localStorage.getItem("id") as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

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

  // Update incomplete tasks
  useEffect(() => {
    if (data?.data?.tasks?.length) {
      const now = new Date();

      const updateStatus = async (task: any) => {
        try {
          await api.put("/api/updatetaskstatus", {
            id: task.id,
            status: "incomplete",
          });
          queryClient.invalidateQueries({ queryKey: ["userTasks", id] });
        } catch (err) {
          console.error("Failed to update status:", err);
        }
      };

      data.data.tasks.forEach((task: any) => {
        if (
          task.eta &&
          task.status !== "completed" &&
          task.status !== "draft" &&
          task.status !== "incomplete"
        ) {
          const etaDate = new Date(task.eta.replace(" ", "T"));
          if (!isNaN(etaDate.getTime()) && now > etaDate) {
            updateStatus(task);
          }
        }
      });
    }
  }, [data]);

  const filteredTasks = data?.data?.tasks?.filter((task: any) => {
    const matchesStatus =
      filterStatus === "all" ? true : task.status === filterStatus;
    const matchesSearch = task.ticket_id
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
        Tasks Page
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Ticket ID (e.g., TICK-DATE(020625)-001)"
          className="border border-gray-300 px-4 py-2 rounded-md text-sm w-full sm:w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="border border-gray-300 px-4 py-2 rounded-md text-sm w-full sm:w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task Table */}
      {filteredTasks?.length > 0 ? (
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm text-black border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left w-5">S.No</th>
                <th className="border px-4 py-2 text-left">Ticket ID</th>
                <th className="border px-4 py-2 text-left">Creator Name</th>
                <th className="border px-4 py-2 text-left">Task Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Priority</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task: any, index: number) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{task.ticket_id}</td>
                  <td className="border px-4 py-2 capitalize">
                    {task.creator_name}
                  </td>
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
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        navigate("/reponsetask", { state: task.id })
                      }
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


