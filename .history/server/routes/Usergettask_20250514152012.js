import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const Usergettask = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await prisma.tasks.findUnique({
      where: { id: id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
