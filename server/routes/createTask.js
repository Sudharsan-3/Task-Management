import { Router } from "express";
import db from "../db/Database.js"

const router = Router()

router.post("/create", async (req, res) => {
    const { user_id, creator_id, task_name, task_description, priority } = req.body;
    if(user_id && creator_id && task_name && task_description && priority){
        await db.query("INSERT INTO tasks(user_id,creator_id,task_name,task_description,priority) VALUES($1,$2,$3,$4,$5)", 
        [user_id, 
            creator_id,
             task_name,
              task_description, 
              priority]);
              res.send("task created successfully")
    }
    else{
        res.send(`You have to enter all thevalues user_id ${user_id}, creator_id : ${creator_id}, task_name : ${task_name}, task_desciption : ${task_description}, priority : ${priority}  `)
    }

})


export default router;

