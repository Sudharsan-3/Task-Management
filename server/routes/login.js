
import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";




dotenv.config()


const prisma =new PrismaClient()



const secretKey = process.env.SECRETTOKEN




 export  const loginController = async  (req, res) => {
    const {email,password} = req.body
    console.log(email,password)
    try {
        
        if(email && password){
            
        const result = await prisma.user.findUnique({
            where: {
              email: email,
            //   password : password
            },
          });
         
         console.log(result)
         if(result){
            const validatePassword = await bcrypt.compare(password,result.password)
           if (validatePassword) {
            
            const token = jwt.sign({username : result.name},secretKey)
            
            console.log(result,`token = ${token}`)
            const name = result.name;
            const role = result.role
            res.send([{name,role},{token}]);
        } else {
            res.status(401).send(`Invalid credentials ${email} ${password}`);
        }
         }else{
            res.send(`There is no user like that ${email}`)
         }
          
        }else{
            res.send(`You have to enter the both email : ${ email } And Password : ${password}`)
        }
        

       
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal server error");
    }
};

 export const profileController =  async (req,verifyToken,res)=>{
    res.send(`welcom to the profile ${res.result.name} `)

}




