import express from "express";
import bodyParser from "body-parser";
import { loginController} from "./routes/login.js";
import { profileController} from "./routes/ProfileController.js";
import {register} from "./routes/register.js"
import {EditTasks} from "./routes/EditTasks.js"
import dotenv from "dotenv"
import {getUsers} from "./routes/getUsers.js"
import {createTask} from "./routes/createTask.js"
import { taskController } from "./routes/GetTasks.js";
import cors from "cors"
import jwt from "jsonwebtoken";
    

dotenv.config()


const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const secretKey = process.env.SECRETTOKEN; // Make sure this is defined in your .env
console.log(secretKey)

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // ✅ Correct way to get the token
  console.log(token,"from headers")

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const verified = jwt.verify(token, secretKey);
    console.log()
    
    req.result = verified;
    console.log(req.result,"verification")
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};


//login
app.use("/api/login",loginController)

//register new user

app.use("/api/register",register)

//Uers

app.use("/api/profile",verifyToken, profileController)

//get all users 

app.use("/api/allUsers",verifyToken, getUsers)


//task creation

app.use( "/api/createTask",verifyToken, createTask)


//Read task

app.use("/api/task",verifyToken,taskController);

//edit tasks

app.use("/api/editTasks",verifyToken,EditTasks)


app.delete("/delete",async(req,res)=>{
    const id = req.body.id
        await db.query("DELETE FROM tasks WHERE id = $1",[id])
})




app.listen(port, () => {
    console.log(`Your server is connected on : http://localhost:${port}`)
})