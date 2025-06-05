import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const UpdateUserTask = async (req, res) => {
  const { id, user_comments, status,eta } = req.body;
  let values =  user_comments|"null";
  const datas = status | "pnding"

  try {
    if (!id || !user_comments || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: Number(id) }, // assuming id is sent in body
      data: {
        user_comments:values,
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
