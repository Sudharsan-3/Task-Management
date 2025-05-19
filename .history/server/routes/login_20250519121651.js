// import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const secretKey = process.env.SECRETTOKEN;

// 🔐 Login Controller
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).send(`You must provide both email and password`);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send(`User not found with email: ${email}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name,email:user.email, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );

    const { id,name, role  } = user;
    res.json([{id, name, role , email }, { token }]);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
};



