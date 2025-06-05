import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const UpdateUserTask = async (req, res) => {
  const { id, user_comments, status, eta } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Missing required field: id" });
    }

    // Determine status based on logic
    let finalStatus = status;

    if (eta && (!status || status.trim() === "")) {
      finalStatus = "pending";
    }

    if (!eta && (!status || status.trim() === "")) {
      return res.status(400).json({ message: "Missing required fields: either ETA or status must be provided" });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: Number(id) },
      data: {
        user_comments: user_comments ?? "", // optional
        status: finalStatus,
        eta,
      },
    });

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export const UpdateUserTask = async (req, res) => {
//   const { id, user_comments, status, eta } = req.body;

//   try {
//     if (!id || !status) {
//       return res.status(400).json({ message: "Missing required fields (id, status)" });
//     }

//     const updatedTask = await prisma.tasks.update({
//       where: { id: Number(id) },
//       data: {
//         user_comments: user_comments ?? "", // optional: send "" if undefined/null
//         status,
//         eta,
//       },
//     });

//     res.status(200).json({ message: "Task updated successfully", task: updatedTask });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// import { PrismaClient } from '@prisma/client';

// // import { PrismaClient } from "../generated/prisma/client.js";
// const prisma = new PrismaClient();

// export const UpdateUserTask = async (req, res) => {
//   const { id, user_comments, status,eta } = req.body;

//   try {
//     if (!id || !user_comments || !status) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const updatedTask = await prisma.tasks.update({
//       where: { id: Number(id) }, // assuming id is sent in body
//       data: {
//         user_comments,
//         status,
//         eta,
//       },
//     });

//     res.status(200).json({ message: "Task updated successfully", task: updatedTask });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
