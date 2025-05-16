import React, { useState } from "react";
import api from "../../api/axios"
import { useLocation } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  user: User; // passed in to associate task with user
  creatorId: number; // admin's ID or logged-in user who creates the task
  onTaskCreated?: () => void; // optional callback after task creation
}

const CreateTask: React.FC<Props> = ({ user, onTaskCreated }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const location = useLocation();
  const users = location.state?.user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/addTask", {
        user_id: user.id,
        creator_id: users.id,
        task_name: taskName,
        task_description: taskDescription,
        priority,
        status
      })

      if (!response) throw new Error("Failed to create task");

      setMessage("Task created successfully!");
      setTaskName("");
      setTaskDescription("");
      setPriority("medium");
      setStatus("draft");
      onTaskCreated?.();
    } catch (err: any) {
      setMessage(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Task for {user.name}</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-green-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Task Name</label>
          <input
            type="text"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="draft">Draft</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
