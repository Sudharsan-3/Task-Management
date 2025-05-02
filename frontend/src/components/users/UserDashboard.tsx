import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  task_name: string;
  task_description?: string;
  priority: string;
  status: string;
  user_comments: string[]; // Assuming comments are stored as a JSON array of strings
}

interface User {
  id: number;
  name: string;
  role: "user" | "admin";
}

interface Props {
  user: User;
}

const UserDashboard: React.FC<Props> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tasks/user/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Error loading tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.id]);

  const handleComplete = async (taskId: number) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/complete`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to complete task");

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (err: any) {
      alert(err.message || "Error completing task");
    }
  };

  const handleAddComment = async (taskId: number) => {
    const comment = commentInput[taskId];
    if (!comment) return;

    try {
      const res = await fetch(`/api/tasks/${taskId}/comment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, user_comments: [...(task.user_comments || []), comment] }
            : task
        )
      );

      setCommentInput((prev) => ({ ...prev, [taskId]: "" }));
    } catch (err: any) {
      alert(err.message || "Error adding comment");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.name}</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{task.task_name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Description:</strong> {task.task_description || "None"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Priority:</strong> {task.priority} |{" "}
                <strong>Status:</strong> {task.status}
              </p>

              {user.role === "user" && (
                <>
                  {task.status !== "completed" && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="mt-3 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                    >
                      Mark as Completed
                    </button>
                  )}

                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentInput[task.id] || ""}
                      onChange={(e) =>
                        setCommentInput((prev) => ({
                          ...prev,
                          [task.id]: e.target.value,
                        }))
                      }
                      className="border px-3 py-1 rounded-md w-3/4"
                    />
                    <button
                      onClick={() => handleAddComment(task.id)}
                      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}

              {task.user_comments && task.user_comments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1 text-gray-700">Comments:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {task.user_comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
