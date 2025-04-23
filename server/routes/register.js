import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client.js"
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient()

const router = Router()


router.post("/register", async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }

    try {
        
        const hashPassword = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                name : name,
                email :email,
                password:hashPassword,
                role:role
            }
        })

        // Successful response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        
        if (error.code === 'P2002') { // Unique constraint violation
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
            
        }


        console.error("Registration error:", error);
        // Generic error response
        return res.status(500).json({
            success: false,
            message: `"Internal server error" ${error.code}`
        });
    }
});


export default router;

