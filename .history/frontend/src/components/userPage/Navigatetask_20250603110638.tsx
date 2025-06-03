import React from 'react'

const Navigatetask = () => {
  return (
    <div>
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
      
    </div>
  )
}

export default Navigatetask
