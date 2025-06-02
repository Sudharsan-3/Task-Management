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

  const [filter, setFilter] = useState("All");

  const fetchUser = async () => {
    const res = await api.post("/api/Usertasks", { id });
    return res;
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchUser,
  });

  // Notification on overdue pending and incomplete tasks
  useEffect(() => {
    if (data?.data?.tasks?.length > 0) {
      const now = new Date();

      const overduePending = data?.data.tasks.find(
        (task: any) =>
          task.status === "pending" && new Date(task.eta) < now
      );

      const overdueIncomplete = data?.data.tasks.find(
        (task: any) =>
          task.status === "incomplete" && new Date(task.eta) < now
      );

      if (overduePending) {
        toast.warn("⚠️ You have a pending task past its ETA!", {
          toastId: "overdue-pending",
        });
      }

      if (overdueIncomplete) {
        toast.warn("⚠️ You have an incomplete task past its ETA!", {
          toastId: "overdue-incomplete",
        });
      }
    }
  }, [data]);

  // Toast loading states
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

  const filteredTasks =
    filter === "All"
      ? data?.data?.tasks
      : data?.data?.tasks.filter((task: any) => task.status === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 flex items-center gap-2 hover:underline"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
        Tasks Page
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

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
                const isOverdue =
                  (task.status === "pending" || task.status === "incomplete") &&
                  new Date(task.eta) < new Date();

                return (
                  <tr
                    key={task.id}
                    className={`hover:bg-gray-50 ${isOverdue ? "bg-red-50" : ""}`}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
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
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                          ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : task.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2 flex flex-col gap-1">
                      <button
                        onClick={() =>
                          navigate("/reponsetask", { state: task.id })
                        }
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        title="Update Task"
                      >
                        <Eye size={18} />
                        Update
                      </button>
                      <button
                        onClick={() =>
                          navigate("/taskdetail", { state: task })
                        }
                        className="flex items-center gap-1 text-green-600 hover:underline"
                        title="View Details"
                      >
                        <ArrowRight size={18} />
                        View
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
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, ArrowLeft, ArrowRight } from "lucide-react";

// const User = () => {
//   const id = localStorage.getItem("id") as string;
//   const navigate = useNavigate();

//   const [filter, setFilter] = useState("All");

//   const fetchUser = async () => {
//     const res = await api.post("/api/Usertasks", { id });
//     return res;
//   };

//   const { data, isLoading, isSuccess, isError } = useQuery({
//     queryKey: ["userTasks", id],
//     queryFn: fetchUser,
//   });

//   // Notification on overdue pending and incomplete tasks
//   useEffect(() => {
//     if (data?.data?.tasks?.length > 0) {
//       const now = new Date();

//       const overduePending = data?.data.tasks.find(
//         (task: any) =>
//           task.status === "pending" && new Date(task.eta) < now
//       );

//       const overdueIncomplete = data?.data.tasks.find(
//         (task: any) =>
//           task.status === "incomplete" && new Date(task.eta) < now
//       );

//       if (overduePending) {
//         toast.warn("⚠️ You have a pending task past its ETA!", {
//           toastId: "overdue-pending",
//         });
//       }

//       if (overdueIncomplete) {
//         toast.warn("⚠️ You have an incomplete task past its ETA!", {
//           toastId: "overdue-incomplete",
//         });
//       }
//     }
//   }, [data]);

//   // Toast loading states
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

//   const filteredTasks =
//     filter === "All"
//       ? data?.data?.tasks
//       : data?.data?.tasks.filter((task: any) => task.status === filter.toLowerCase());

//   return (
//     <div className="min-h-screen bg-white p-4 sm:p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 flex items-center gap-2 hover:underline"
//       >
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-black">
//         Tasks Page
//       </h1>

//       {/* Filter Dropdown */}
//       <div className="mb-4 flex justify-end">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border border-gray-300 px-3 py-1 rounded text-sm"
//         >
//           <option value="All">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//           <option value="Incomplete">Incomplete</option>
//         </select>
//       </div>

//       {filteredTasks?.length > 0 ? (
//         <div className="overflow-auto border border-gray-300 rounded-md">
//           <table className="min-w-full text-sm text-black border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 text-left w-5">S.No</th>
//                 <th className="border px-4 py-2 text-left">Creator Name</th>
//                 <th className="border px-4 py-2 text-left">Task Name</th>
//                 <th className="border px-4 py-2 text-left">Description</th>
//                 <th className="border px-4 py-2 text-left">Priority</th>
//                 <th className="border px-4 py-2 text-left">Status</th>
//                 <th className="border px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTasks.map((task: any, index: number) => {
//                 const isOverdue =
//                   (task.status === "pending" || task.status === "incomplete") &&
//                   new Date(task.eta) < new Date();

//                 return (
//                   <tr
//                     key={task.id}
//                     className={`hover:bg-gray-50 ${isOverdue ? "bg-red-50" : ""}`}
//                   >
//                     <td className="border px-4 py-2">{index + 1}</td>
//                     <td className="border px-4 py-2 capitalize">
//                       {task.creator_name}
//                     </td>
//                     <td className="border px-4 py-2">{task.task_name}</td>
//                     <td className="border px-4 py-2">{task.task_description}</td>
//                     <td className="border px-4 py-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//                           ${
//                             task.priority === "high"
//                               ? "bg-red-100 text-red-700"
//                               : task.priority === "medium"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-green-100 text-green-700"
//                           }`}
//                       >
//                         {task.priority}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
//                           ${
//                             task.status === "completed"
//                               ? "bg-green-100 text-green-700"
//                               : task.status === "pending"
//                               ? "bg-orange-100 text-orange-700"
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                       >
//                         {task.status}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2 flex flex-col gap-1">
//                       <button
//                         onClick={() =>
//                           navigate("/reponsetask", { state: task.id })
//                         }
//                         className="flex items-center gap-1 text-blue-600 hover:underline"
//                         title="Update Task"
//                       >
//                         <Eye size={18} />
//                         Update
//                       </button>
//                       <button
//                         onClick={() =>
//                           navigate("/taskdetail", { state: task })
//                         }
//                         className="flex items-center gap-1 text-green-600 hover:underline"
//                         title="View Details"
//                       >
//                         <ArrowRight size={18} />
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
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



