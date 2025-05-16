import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const UserCompleted = async (req, res) => {
  const { id } = req.body;
  const status = "completed"
  try {
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await prisma.tasks.find({
      where: { id: id ,status:status},
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task fetched successfully", tasks:task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
