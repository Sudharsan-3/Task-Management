import { PrismaClient } from '@prisma/client';
// Getting all the users 
// import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const Admin = async (req, res) => {
    const {id} = req.body
  try {
    const response = await prisma.user.findMany({
      where:{role:"user"},
      include:{tasks : true,where:{creator}}
    });
    const users = response

    if (users.length > 0) {
      return res.status(200).json({
        message: "Users fetched successfully",
        users: users,
      });
    } else {
      return res.status(404).json({
        message: "No users found with role 'user'",
        users: [],
      });
    }

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      error: "Internal server error while fetching users",
      details: error.message,
    });
  }
};