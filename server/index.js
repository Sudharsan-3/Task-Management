import express from "express";
import bodyParser from "body-parser";
import { loginController, profileController} from "./routes/login.js";

import dotenv from "dotenv"
import Register from "./routes/register.js"
import CreateTask from "./routes/createTask.js"
import { taskController } from "./routes/GetTasks.js";
import cors from "cors"
import jwt from "jsonwebtoken";


dotenv.config()


const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const verifyToken = (req,res,next)=>{
    const token = req.header.authorization;
    if(!token) return res.status(401).send("Require token");

    try{
        const verify = jwt.verify(token,secretKey);
        req.result = verified;
        next()
    }catch(error){
        res.status(400)
    }

}


//login
app.use("/api/login",loginController)

app.use("api/profile", profileController)
//register new user

app.use("/api",Register)

//task creation

app.use(CreateTask)

//Read task

app.use("api/task",taskController);



app.patch("/edit",(req,res)=>{

})


app.delete("/delete",async(req,res)=>{
    const id = req.body.id
        await db.query("DELETE FROM tasks WHERE id = $1",[id])
})




app.listen(port, () => {
    console.log(`Your server is connected on : http://localhost:${port}`)
})