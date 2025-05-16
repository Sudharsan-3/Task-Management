//getting all the users 
import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()

export const getUsers = async(req,res)=>{
    const {id} =req.body
    console.log(id,"serverside id")
    try {
         const response = await prisma.user.findMany();
    console.log(response);
    const users = response.filter(e => e.creator_id === id)

    res.send(users)
    } catch (error) {
        res.send(error)
    }

   

}