import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CreateTask = async (req, res) => {
  try {
    const { user_name, user_id, creator_id, task_name, task_description, priority, creator_name } = req.body;

    const uId = parseInt(user_id);
    const cId = parseInt(creator_id);

    const user = await prisma.user.findUnique({ where: { id: uId } });
    const creator = await prisma.user.findUnique({ where: { id: cId } });

    if (!user || !creator) {
      return res.status(400).json({ error: "User or creator does not exist." });
    }

    // Step 1: Generate today's ticket prefix
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2); // last 2 digits

    const dateString = `${day}${month}${year}`; // 191225
    const ticketPrefix = `TICK-(${dateString})`;

    // Step 2: Count how many tasks this admin created today
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    const taskCount = await prisma.tasks.count({
      where: {
        creator_id: cId,
        created_at: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // Check limit
    if (taskCount >= 100) {
      return res.status(400).json({ error: "Daily task limit (100) reached for this admin." });
    }

    // Step 3: Generate full ticket number
    const ticketNumber = String(taskCount + 1).padStart(3, '0'); // 001, 002, ...
    const ticket = `${ticketPrefix}-${ticketNumber}`; // TICK-DATE(191225)-001

    // Step 4: Create task
    const newTask = await prisma.tasks.create({
      data: {
        user_id: uId,
        creator_id: cId,
        task_name,
        task_description,
        priority,
        user_name,
        status: 'draft',
        creator_name,
        ticket,
      },
    });

    console.log("✅ Task Created:", newTask);
    return res.status(201).json({ message: "Task created successfully", task: newTask });

  } catch (error) {
    console.error("❌ Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// import { PrismaClient } from '@prisma/client';
// // import { PrismaClient } from "../generated/prisma/client.js";


// const prisma = new PrismaClient();

// export const CreateTask = async (req, res) => {
//   try {
//     const { user_name, user_id, creator_id, task_name, task_description, priority, creator_name } = req.body;

//     // Convert string IDs to integers
//     const uId = parseInt(user_id);
//     const cId = parseInt(creator_id);

//     // Check if both users exist in the database
//     const user = await prisma.User.findUnique({ where: { id: uId } });
//     const creator = await prisma.user.findUnique({ where: { id: cId } });
//     console.log(user,creator,"from server",user_id,creator_id)

//     if (!user || !creator) {
//       return res.status(400).json({ error: "User or creator does not exist." });
//     }

//     const newTask = await prisma.tasks.create({
//       data: {
//         user_id: uId,
//         creator_id: cId,
//         task_name,
//         task_description,
//         priority,
//         user_name,
//         status: 'draft', // Optional if default is already 'draft'
//         creator_name
//       },
//     });

//     console.log("✅ Task Created:", newTask);
//     return res.status(201).json({ message: "Task created successfully", task: newTask });

//   } catch (error) {
//     console.error("❌ Error creating task:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
