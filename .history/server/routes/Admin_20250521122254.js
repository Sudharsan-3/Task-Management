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
    console.log(res)

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

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Controller to fetch users with tasks created by a specific admin
// export const Admin = async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({
//       error: "Admin ID (creator_id) is required in the request body",
//     });
//   }

//   try {
//     const adminId = parseInt(id);
//     console.log("Fetching users with tasks created by admin ID:", adminId);

//     const response = await prisma.user.findMany({
//       where: {
//         role: "user",
//       },
//       include: {
//         tasks_tasks_user_idTousers: {
//           where: {
//             creator_id: adminId,
//           },
//         },
//       },
//     });
//     console.log(response,"from admin")

//     // Optional: Filter out users with no tasks from this admin
//     const usersWithTasks = response.filter(
//       (user) => user.tasks_tasks_user_idTousers.length > 0
//     );

//     if (usersWithTasks.length > 0) {
//       return res.status(200).json({
//         message: "Users and their tasks fetched successfully",
//         users: usersWithTasks,
//       });
//     } else {
//       return res.status(404).json({
//         message: "No users found with tasks created by this admin",
//         users: [],
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching users and tasks:", error);
//     return res.status(500).json({
//       error: "Internal server error while fetching users and tasks",
//       details: error.message,
//     });
//   }
// };
