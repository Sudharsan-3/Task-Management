import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const EditTasks = async (req, res) => {
  const { id, task_name, task_description, priority } = req.body;

  // Validate and parse task ID
  const t_id = parseInt(id);
  if (isNaN(t_id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    // Update the task
    const updatedTask = await prisma.tasks.update({
      where: { id: t_id },
      data: {
        task_name,
        task_description,
        priority,
      },
    });

    console.log("Task updated:", updatedTask);

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error("Update failed:", error);

    if (error.code === "P2025") {
      // Prisma-specific error: Record not found
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(500).json({
      error: "Something went wrong while updating the task",
      details: error.message,
    });
  }
};

