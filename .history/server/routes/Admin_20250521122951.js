import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Admin = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Admin ID is required in the request body",
    });
  }

  const adminId = parseInt(id);
  console.log("Admin ID:", adminId);

  try {
    const usersWithTasks = await prisma.user.findMany({
      where: {
        role: "user",
        NOT: {
          id: adminId, // exclude the admin from the user list
        },
      },
      include: {
        tasks_tasks_user_idTousers: {
          where: {
            creator_id: adminId, // only include tasks created by this admin
          },
        },
      },
    });
    console.log(usersWithTasks)

    return res.status(200).json({
      message: "Users and their tasks created by this admin fetched successfully",
      users: usersWithTasks,
    });
  } catch (error) {
    console.error("Error fetching users and tasks:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

