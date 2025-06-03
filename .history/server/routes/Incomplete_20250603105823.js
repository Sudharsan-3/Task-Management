import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const Incomplete = async (req, res) => {
  const { taskId,status } = req.body;
    console.log(taskId,status)
  try {
    if (!taskId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: Number(taskId) }, // assuming id is sent in body
      data: {
        status,
        eta,
      },
    });

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
