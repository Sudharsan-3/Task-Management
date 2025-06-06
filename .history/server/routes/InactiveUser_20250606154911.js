import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const IncativeUser = async (req, res) => {
  const { id, mode } = req.body;

  // Validate and parse task ID
  const t_id = parseInt(id);
  if (isNaN(t_id) || !mode) {
    return res.status(400).json({ error: "Invalid task ID or node selected mode" });
  }

  try {
    // Update the task
    const updatedUser = await prisma.user.update({
      where: { id: t_id },
      data: {
        mode,
       
      },
    });

    console.log("Task updated:", updatedUser);

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedUser,
    });

  } catch (error) {
    console.error("Update failed:", error);

    if (error.code === "P2025") {
      // Prisma-specific error: Record not found
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(500).json({
      error: "Something went wrong while updating the user mode",
      details: error.message,
    });
  }
};

